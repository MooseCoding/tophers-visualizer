'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import PathControls from "@/components/path-controls";
import { Paths, Poses } from "@/hooks/use-visualizer";
import PoseControls from "@/components/pose-controls";

import { useEffect, useState, useRef } from "react";

import DrawPoses from "@/visualization/pose-visualizer";

export default function Home() {

  const {
   poses,
   deletePose,
   addPose,
   updatePose,
   setPoses,
  } = Poses();

  const {
    paths,
    setPaths,
    addPath,
    updatePath,
    deletePath,
    addControlPoint,
    updateControlPoint,
    deleteControlPoint,
    addCallback,
    updateCallback,
    deleteCallback
  } = Paths();

  const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
    useEffect(() => {
      if (!containerRef.current || !imageRef.current) return;
  
      const updateDimensions = () => {
        if (imageRef.current) {
          // Obtains actual scaled layout constraints from object-contain bounds
          setDimensions({
            width: imageRef.current.clientWidth,
            height: imageRef.current.clientHeight,
          });
        }
      };
  
      const resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });
  
      resizeObserver.observe(containerRef.current);
      imageRef.current.addEventListener('load', updateDimensions);
  
      return () => {
        resizeObserver.disconnect();
      };
    }, []);

  return (
    // Replaced h-screen with calc(100vh - navbar_height) so it fits perfectly on your monitor
    <div className="flex flex-row h-[calc(100vh-56px)] p-4">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-full max-w-md rounded-lg border min-w-full"
      >
        <ResizablePanel defaultSize="25%" maxSize="30%" minSize="17%">
          <span>
            <PoseControls
              poses={poses}
              deletePose={deletePose}
              addPose={addPose}
              updatePose={updatePose}
              setPoses={setPoses}
            />
          </span>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%" minSize="30%">
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
              <img
                  src="./images/decodeField.png"
                  className="max-h-full max-w-full object-contain"
                  alt="Decode Field"
                  draggable="false"
            />

            <DrawPoses 
                            poses={poses} 
                            
                          />
                      
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="35%" maxSize="40%" minSize="27%">
          <div className="h-full items-center justify-center">
            <span className="font-semibold">
              <PathControls
                Poses={poses}
                paths={paths}
                setPaths={setPaths}
                addPath={addPath}
                updatePath={updatePath}
                deletePath={deletePath}
                addControlPoint={addControlPoint}
                updateControlPoint={updateControlPoint}
                deleteControlPoint={deleteControlPoint}
                addCallback={addCallback}
                updateCallback={updateCallback}
                deleteCallback={deleteCallback}
              />
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}