import React, { useEffect, useState } from 'react';
import { ReactFlow, Background, BackgroundVariant, Node } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import CollectionCardComponent from './components/CollectionCard';
import CollectionCardNode from './components/CollectionCardNode';
import Sidebar from './components/Sidebar';
import { ParsedTable } from '@components/libs/types';

 
const nodeTypes = {
  collectionCard: CollectionCardNode
}

const sideBarWidth = 240;
const headerHeight = 64;

export const globalVars = {
  finRendering : false as any,
  setFinRendering: 0 as any,
  nodeItems: 0
}

export default function App() {
  const [nodes, setNodes] = React.useState<Node[]>([]);
  const [finRendering, setFinRendering] = useState(false)

  globalVars.finRendering = finRendering;
  globalVars.setFinRendering = setFinRendering;
  const nodeRefs = React.useRef<{ [id: string]: HTMLDivElement | null }>({});

  const setNodeRef = (id: string) => (el: HTMLDivElement | null) => {
    nodeRefs.current[id] = el;
  };

  useEffect(() => {
    Promise.all([
      fetch('/test/user.db.json'),
      fetch('/test/book.db.json')
    ])
    .then(async ([userResponse, bookResponse]) => {
      const userDB = await userResponse.json();
      const bookDB = await bookResponse.json();

      let nodeId = 0;
      const newNodes: Node[] = [];
      for(const table of userDB) {
        nodeId++;
        newNodes.push({
          id: String(nodeId),
          type: 'collectionCard',
          data: {
            parsedData: table as ParsedTable,
            setRef: setNodeRef(String(nodeId)),
          },
          position: { x: 0, y: 0 },
        });
      }
      globalVars.nodeItems = newNodes.length;
      setNodes((prevNodes) => [
        ...newNodes,
      ]);
    });
    
  }, []);

  useEffect(()=>{
    if (nodes.length === 0) return;
    let x = 36, y = 36;
    let beforeX = 0;
    let beforeY = 0;
    const updateNodes = nodes.map((node)=>{
      const el = nodeRefs.current[node.id];
      const width = el ? el.offsetWidth : 0;
      const height = el ? el.offsetHeight : 0;
      const newNode = { ...node, position: { x: beforeX + x, y: y } };
      beforeX += width + x;
      return newNode;
    })
    setNodes(updateNodes);
  }, [globalVars.finRendering]);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>

    <div style={{ width : '100%', height: headerHeight, }}>
      <div style={{ borderBottom: '1px solid #efefef', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px', height: '100%', maxHeight: '64px', boxSizing: 'border-box' }}>
        <div style={{
          maxWidth: '1440px', width: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 16px', width: '100%' }}>
            <a href="#">
              <img src="./images/logo.png" style={{width:"128px", display: "block", overflow: "hidden"}} />
            </a>
          </div>
        </div>
      </div>
    </div>

    <Sidebar width={sideBarWidth + "px"} top={headerHeight + "px"} />

      <div style={{ width: "100vw", height:"100vh", marginLeft: sideBarWidth}}>
        <ReactFlow nodes={nodes} nodeTypes={nodeTypes} width={ 1000 } height={1000}>
          <Background variant={BackgroundVariant.Lines} />
        </ReactFlow>
      </div>


    <div> Footer </div>
    </div>
  );
}
