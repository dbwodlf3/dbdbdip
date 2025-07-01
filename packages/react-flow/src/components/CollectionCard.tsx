import React from 'react';
import '@components'; // customElements.define 가 실행되도록 반드시 먼저 import
import { ParsedTable } from '@components/libs/types';

interface ParsedDataWrapperProps {
  parsedData?: ParsedTable;
}

export default function CollectionCardComponent({ parsedData }: ParsedDataWrapperProps) {
  return React.createElement('table-component', {
    'parsed-data': JSON.stringify(parsedData),
  });
}