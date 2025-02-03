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
import Ranking from '@/components/component/garph-win-lose';
export const pagesObject = [
    { title: '기지국 설치', component: <StationVisualizer />, codeUrl: 'https://github.com/KIMLENDING/codeTest/blob/main/level-3/%EA%B8%B0%EC%A7%80%EA%B5%AD%20%EC%84%A4%EC%B9%98.js' },
    { title: '숫자 게임', component: <ArrayComparisonVisualizer />, codeUrl: 'https://github.com/KIMLENDING/codeTest/blob/main/level-3/%EC%88%AB%EC%9E%90%20%EA%B2%8C%EC%9E%84.js' },
    { title: '베스트앨범', component: <GenreVisualization />, codeUrl: 'https://github.com/KIMLENDING/codeTest/blob/main/level-3/%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%95%A8%EB%B2%94.js' },
    { title: '단어 변환', component: <WordTransformationVisualizer />, codeUrl: 'https://github.com/KIMLENDING/codeTest/blob/main/level-3/%EB%8B%A8%EC%96%B4%20%EB%B3%80%ED%99%98.js' },
    { title: '네트워크', component: <NetworkVisualization />, codeUrl: 'https://github.com/KIMLENDING/codeTest/blob/main/level-3/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC.js' },
    { title: '등굣길', component: <PathVisualizer />, codeUrl: 'https://github.com/KIMLENDING/codeTest/blob/main/level-3/%EB%93%B1%EA%B5%A3%EA%B8%B8.js' },
    { title: '이중우선순위큐', component: <QueueVisualization />, codeUrl: 'https://github.com/KIMLENDING/codeTest/blob/main/level-3/%EC%9D%B4%EC%A4%91%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84%ED%81%90.js' },
    { title: '단속카메라', component: <RouteVisualization />, codeUrl: 'https://github.com/KIMLENDING/codeTest/blob/main/level-3/%EB%8B%A8%EC%86%8D%EC%B9%B4%EB%A9%94%EB%9D%BC.js' },
    { title: '정수 삼각형', component: <TrianglePathVisualization />, codeUrl: 'https://github.com/KIMLENDING/codeTest/blob/main/level-3/%EC%A0%95%EC%88%98%20%EC%82%BC%EA%B0%81%ED%98%95.js' },
    { title: '섬 연결하기', component: <ConnectingIsland />, codeUrl: 'https://github.com/KIMLENDING/codeTest/blob/main/level-3/%EC%84%AC%20%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0.js' },
    { title: '순위', component: <Ranking />, codeUrl: 'https://github.com/KIMLENDING/codeTest/blob/main/level-3/%EC%88%9C%EC%9C%84.js' },
];