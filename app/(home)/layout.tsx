'use client';
import React, { useEffect, useState } from 'react';
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
import { ChevronRight, Menu, X } from 'lucide-react';

const Layout = () => {
    const [select, setSelect] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // 초기 로드 시 한 번 실행
        handleResize();

        // 윈도우 리사이즈 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
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
    ];

    const handleSelect = (title: string) => {
        setSelect(title);
        // 모바일에서 선택 후 사이드바 닫기
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Toggle Button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg hover:bg-indigo-700"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-6 relative">
                    {/* Sidebar */}
                    <div className={`
            fixed md:relative top-0 left-0 h-full md:h-auto z-40
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            bg-white md:bg-transparent
            w-72 shrink-0
          `}>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-screen md:h-auto">
                            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
                                <h2 className="text-lg font-semibold">알고리즘 시각화</h2>
                            </div>
                            <div className="divide-y divide-gray-100 max-h-[calc(100vh-4rem)] md:max-h-[70vh] overflow-y-auto">
                                {page.map((item) => (
                                    <button
                                        key={item.title}
                                        onClick={() => handleSelect(item.title)}
                                        className={`w-full px-4 py-3 flex items-center justify-between transition-colors duration-150 hover:bg-indigo-50 ${select === item.title ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700'
                                            }`}
                                    >
                                        <span className="font-medium">{item.title}</span>
                                        <ChevronRight
                                            className={`w-4 h-4 transition-transform ${select === item.title ? 'rotate-90 text-indigo-600' : 'text-gray-400'
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Overlay for mobile */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 min-h-[70vh]">
                            {select ? (
                                page.find((t) => t.title === select)?.component
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-500">
                                    <p className="text-center">
                                        {isMobile
                                            ? "좌측 상단 메뉴 버튼을 눌러 알고리즘을 선택해주세요"
                                            : "왼쪽 메뉴에서 시각화할 알고리즘을 선택해주세요"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;