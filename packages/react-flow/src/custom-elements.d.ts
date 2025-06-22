// src/custom-elements.ts
import type * as React from 'react'; // 이거 중요함!

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'table-component': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
export {};