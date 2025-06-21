import path from "path";
import { spawn } from "child_process"

// Get Project Root from cli options, Get Main Entry Point from cli options
// Example usage: ts-node ./scripts/start.ts --projectRoot /path/to/project --main /path/to/main.ts
const projectRoot = process.argv.find(arg => arg.startsWith('--projectRoot='))?.replace('--projectRoot=', '');
const mainEntry = process.argv.find(arg => arg.startsWith('--main='))?.replace('--main=', '');

if (!projectRoot || !mainEntry) {
    console.error('Please provide --projectRoot="something" and --main="something" arguments.');
    process.exit(1);
}

console.log('projectRoot:', projectRoot);
console.log('mainEntry:', mainEntry);


const srcPath = path.join(projectRoot, "src");
let NODE_PATH = `projectRoot:${srcPath}`;

if(process.platform == 'win32')  {
    NODE_PATH = `projectRoot;${srcPath}`;
}
else {
    NODE_PATH = `projectRoot:${srcPath}`;
}

spawn(`npx ts-node --project ${projectRoot}/tsconfig.json ${mainEntry}`, 
    { shell: true, stdio: 'inherit', env: { NODE_PATH: NODE_PATH, ...process.env } }
);