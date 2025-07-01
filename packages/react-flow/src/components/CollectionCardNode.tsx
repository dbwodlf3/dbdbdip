import React, { useEffect, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals, NodeProps } from '@xyflow/react';
import CollectionCardComponent from './CollectionCard';
import { globalVars } from '../App';

export default function CollectionCardNode({ id, data }: NodeProps) {
  let ref = useRef<HTMLDivElement>(null);
  if(data.setRef) {
    ref = data.setRef as React.RefObject<HTMLDivElement>;
  }

  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if(globalVars.nodeItems == Number(id) || 0) {
      globalVars.setFinRendering(true);
    }
  }, [id]);

  return (
    <div ref={data.setRef as any ?? ref} style={{ display: 'inline-block' }}>
      <CollectionCardComponent {...data} />
    </div>
  );
}