'use client'
import ArrayComparisonVisualizer from "@/components/component/array-comparison-visualization";
import GenreVisualization from "@/components/component/genre-visualization";
import NetworkVisualization from "@/components/component/network-visualization";
import PathVisualizer from "@/components/component/path-visualizer";
import QueueVisualization from "@/components/component/queue-visualization";
import RouteVisualization from "@/components/component/route-visualization";
import StationVisualizer from "@/components/component/station-visualization";
import TrianglePathVisualization from "@/components/component/triangle-path-visualization";
import ConnectingIsland from "@/components/component/union-find-visualization";
import WordTransformationVisualizer from "@/components/component/word-transformation-visualizer";
import { useState } from "react";



export default function Home() {
  const [select, setSelect] = useState('');
  const page = [
    { title: '기지국 설치', component: <StationVisualizer /> },
    { title: '숫자 게임', component: <ArrayComparisonVisualizer /> },
    { title: '베스트앨범', component: <GenreVisualization /> },
    { title: '단어 변환', component: <WordTransformationVisualizer /> },
    { title: '네트워크', component: <NetworkVisualization /> },
    { title: '등굣길', component: <PathVisualizer /> },
    { title: '이중우선순위큐', component: <QueueVisualization /> },
    { title: '단속카메라', component: <RouteVisualization /> },
    { title: '정수 삼각형', component: <TrianglePathVisualization /> },
    { title: '섬 연결하기', component: <ConnectingIsland /> },
  ]

  return (
    <div className="flex flex-row justify-center mx-auto mt-12">
      <div className=" flex  flex-col h-[50vh]  overflow-scroll w-64 bg-zinc-400  p-2">
        {page.map((item, i) => (
          <div key={item.title} className="flex items-center  mb-2 hover:bg-blue-400 rounded p-1">
            <div className="font-semibold " onClick={() => setSelect(item.title)}>

              {item.title}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full mx-4">
        {page.find((t) => t.title === select)?.component}
      </div>
    </div>
  );
}
