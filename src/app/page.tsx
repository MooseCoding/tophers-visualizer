'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";


export default function Home() {
  return (
    <div className="flex flex-row h-screen p-4 font-mono bg-[#1c1c1c]">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-full max-w-md rounded-lg border md:min-w-full"
      >
        <ResizablePanel defaultSize="16.7%" maxSize="30%" minSize="7.5%">
      
          <span className="flex h-full flex-col">
  
            <div className="flex justify-center p-4 text-3xl font-bold text-white">
              Poses
              
            </div>
            
              <Button className="flex m-4 bg-[#C00000] text-white">
                  <Plus/>
                  Add Pose  
              </Button>
            <ScrollArea className="w-full flex-1 min-h-0 rounded-md border p-4">
              <div className="flex text-white">
                 <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Pose 1</AccordionTrigger>
                    <AccordionContent> 
                
                      <div className="flex flex-col gap-3 pt-2">
                        <div className="flex flex-col gap-1">
                          <FieldLabel htmlFor="x-input" className="text-xs text-muted-foreground">
                            <p className="text-white">Enter x:</p>
                          </FieldLabel>
                          <Input
                            id="x-input"
                            type="text"
                            placeholder="X"
                            className="w-full" 
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <FieldLabel htmlFor="y-input" className="text-xs text-muted-foreground">
                            <p className="text-white">Enter y:</p>
                          </FieldLabel>
                          <Input
                            id="y-input"
                            type="text"
                            placeholder="Y"
                            className="w-full" 
                          />
                        </div>
                        
                       
                        <div className="flex items-center space-x-2">
                          <Switch id="arc-pose"  />
                          <label htmlFor="arc-pose" className="text-sm select-none cursor-pointer">
                            Arc Pose
                          </label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <label htmlFor="local" className="text-sm select-none cursor-pointer">
                            Local
                          </label>
                          <Switch id="local-global"/>
                          <label htmlFor="global" className="text-sm select-none cursor-pointer">
                            Global
                          </label>
                        </div>
                      </div>
                     </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ScrollArea>

          </span>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="58.3%" minSize="40%">
          <div className="flex h-full items-center justify-center">
              <span className="font-semibold">
                <img src = "./images/decodeField.png"/>
              </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="25%" maxSize="30%" minSize="10%">
          <div className="h-full items-center justify-center p-6 h-f">
            <span className="font-semibold">
              
              <div className="flex h-full items-start justify-center p-6 text-3xl text-bold">
                Paths
              </div>
              
              
              </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
