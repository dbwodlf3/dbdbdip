import "./custom-elements"; // 타입 선언 강제 포함
import "@components";
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// TypeScript에게 'table-component'가 커스텀 엘리먼트임을 알립니다.
// 이 선언을 src/global.d.ts 파일로 이동하세요.

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <table-component></table-component>
  </StrictMode>,
);