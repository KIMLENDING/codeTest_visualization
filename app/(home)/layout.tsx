'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight, Github, Menu, X } from 'lucide-react';
import { pagesObject } from '@/lib/data';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // 선택된 페이지를 URL에서 가져오기
    const select = searchParams.get('id') || '';
    const page = pagesObject;

    // 페이지 선택 시 URL 변경
    const handleSelect = (title: string) => {
        router.push(`?id=${title}`, { scroll: false });
        if (window.innerWidth < 768) setSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-zinc-800">
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
                        md:bg-transparent w-72 shrink-0
                    `}>
                        <div className="bg-zinc-200 rounded-lg shadow-lg overflow-hidden h-screen md:h-auto">
                            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
                                <h2 className="text-lg font-semibold">알고리즘 시각화</h2>
                            </div>
                            <div className="divide-y divide-gray-100 max-h-[calc(100vh-4rem)] md:max-h-[70vh] overflow-y-auto">
                                {page.map((item) => (
                                    <div key={item.title} className="flex flex-row">
                                        <button
                                            onClick={() => handleSelect(item.title)}
                                            className={`w-full px-4 py-3 flex items-center justify-between transition-colors duration-150 hover:bg-indigo-50 ${select === item.title ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700'}`}
                                        >
                                            <span className="font-medium">{item.title}</span>
                                            <ChevronRight
                                                className={`w-4 h-4 transition-transform ${select === item.title ? 'rotate-90 text-indigo-600' : 'text-gray-400'}`}
                                            />
                                        </button>
                                        <div className="flex items-center justify-between group relative mr-2">
                                            <div className="hidden group-hover:block -top-8 bg-gray-800 text-white px-2 py-1 rounded text-sm">
                                                코드보기
                                            </div>
                                            <Link href={item.codeUrl}>
                                                <Github className="h-5 w-5" />
                                            </Link>
                                        </div>
                                    </div>
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
                        <div className="bg-zinc-200 rounded-lg shadow-lg p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
