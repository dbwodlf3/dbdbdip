const dbName = 'rlovel_client_db';
const storeName = 'rlovel_data_store';
let cryptoKeyPromise: Promise<CryptoKey> | null = null;

async function fetchRawKey(): Promise<string> {
  const res = await fetch('/api/user/getCryptKey');
  const json = await res.json();
  if (!json.data) throw new Error('Key not found');
  return json.data; // raw hex or base64
}

async function getCryptoKey(): Promise<CryptoKey> {
  if (!cryptoKeyPromise) {
    cryptoKeyPromise = (async () => {
      const raw = await fetchRawKey(); // 서버에서 받은 키 (문자열)
      const encoder = new TextEncoder();

      // 1. 문자열을 importKey로 PBKDF2에 쓸 수 있는 key 형식으로 변환
      const baseKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(raw),
        'PBKDF2',
        false,
        ['deriveKey']
      );

      // 2. salt는 고정된 값으로 (같은 키를 계속 쓸 수 있게)
      const salt = encoder.encode('rlovel-fixed-salt');

      // 3. 파생 키 만들기
      return crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
    })();
  }
  return cryptoKeyPromise;
}

function openDB(version = 1): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const req = indexedDB.open(dbName, version);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(storeName)) {
        req.result.createObjectStore(storeName);
      }
    };
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

async function encryptString(plaintext: string): Promise<{ cipher: Uint8Array; iv: Uint8Array }> {
  const key = await getCryptoKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder().encode(plaintext);
  const cipherBuf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc);
  return { cipher: new Uint8Array(cipherBuf), iv };
}

async function decryptString(cipher: Uint8Array, iv: Uint8Array): Promise<string> {
  const key = await getCryptoKey();
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher);
  return new TextDecoder().decode(decrypted);
}

async function setEncrypted(key: string, value: string): Promise<void> {
  const db = await openDB();
  const { cipher, iv } = await encryptString(value);
  return new Promise((res, rej) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put({ cipher, iv }, key);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}

async function getDecrypted(key: string): Promise<string | undefined> {
  const db = await openDB();
  return new Promise(async (res, rej) => {
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).get(key);
    req.onsuccess = async () => {
      const rec = req.result;
      if (!rec) return res(undefined);
      const plain = await decryptString(rec.cipher, rec.iv);
      res(plain);
    };
    req.onerror = () => rej(req.error);
  });
}

export async function setValue(key: string, value: any): Promise<void> {
  // 객체든 문자열이든 저장 가능하게 JSON 직렬화 후 저장
  const json = JSON.stringify(value);
  await setEncrypted(key, json);
}

export async function getValue<T = any>(key: string): Promise<T | undefined> {
  const decrypted = await getDecrypted(key);
  if (decrypted === undefined) return undefined;
  return JSON.parse(decrypted) as T;
}
