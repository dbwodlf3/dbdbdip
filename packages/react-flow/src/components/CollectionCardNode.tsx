import React, { useEffect, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals, NodeProps } from '@xyflow/react';
import CollectionCardComponent from './CollectionCard';

export default function CollectionCardNode({ id, data }: NodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if (ref.current) {
      updateNodeInternals(id); // 노드 크기 재계산
    }
  }, [id]);

  return (
    <div ref={ref} style={{ display: 'inline-block' }}>
      <CollectionCardComponent {...data} />
    </div>
  );
}