import React, { useState } from 'react';

interface SidebarProps {
  width?: string;
  top?: string;
}

export default function Sidebar({ width, top }: SidebarProps) {

  const sideBarWidth = width;
  const sideBarTop = top

  return (
    <>
      <style>{`
        .treeRoot {
          margin: 0px 8px;
          margin-top: 12px;
          padding-left: 12px;
          overflow: hidden;
        }

        .treeRootText {
          font-size: 18px;
          font-weight: bold;
        }
          
        .treeRootText:hover {
          background-color: #eee;
          cursor: pointer;
        }

        .treeRoot > div:last-child {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .treeRoot.expanded > div:last-child {
          max-height: 500px; /* 충분히 큰 값으로 */
        }

        .treeChild {
          padding-top: 4px;
          padding-left: 12px;
          margin-left: 24px;
          border-left: 1px solid #ccc;
        }

        .treeChildText:hover {
          background-color: #f0f0f0;
          cursor: pointer;
        }
      `}</style>

      <div style={{
        position: "fixed", borderRight: '1px solid #efefef', top: sideBarTop,
        width: sideBarWidth, height: '100vh', display: 'flex', flexDirection: 'column',
        padding: ''
      }}>
          <div className="treeRoot"> 
            <div className="treeRootText"   onClick={(e) => {(e.currentTarget.parentNode as HTMLElement).classList.toggle('expanded');}} >
              User Database 
            </div>
            <div>
              <div className="treeChild"> 
                <div className="treeChildText">User</div>
              </div>
              <div className="treeChild"> 
                <div className="treeChildText">UserRefreshToken</div>
              </div>
              <div className="treeChild"> 
                <div className="treeChildText">UserHistory</div>
              </div>
            </div>
          </div>
          <div className="treeRoot"> 
            <div className="treeRootText"   onClick={(e) => {(e.currentTarget.parentNode as HTMLElement).classList.toggle('expanded');}} >
              Video Store 
            </div>
            <div>
              <div className="treeChild"> 
                <div className="treeChildText">Book</div>
              </div>
              <div className="treeChild"> 
                <div className="treeChildText">Video</div>
              </div>
              <div className="treeChild"> 
                <div className="treeChildText">RentalItem</div>
              </div>
            </div>
          </div>
      </div>
  </>
  )
}