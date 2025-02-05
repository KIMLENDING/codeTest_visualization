import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import NameScriptLayout from '../layout/nameScriptLayout';

const ConnectingIsland = () => {
    const n = 4;
    const costs = [
        [0, 1, 1], // [연결된 다리1,연결된 다리2,건설 비용]
        [0, 2, 2],
        [1, 2, 5],
        [1, 3, 1],
        [2, 3, 8],
    ].sort((a, b) => a[2] - b[2]);

    const [parent, setParent] = useState<number[]>([]);
    const [sum, setSum] = useState(0);
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    // Find 함수 (루트 노드 찾기)
    const find = (x: number): number => {
        if (parent[x] === x) return x;
        return (parent[x] = find(parent[x])); // 경로 압축 -> 모두 연결되도록
    };

    // Union 함수 (두 노드 연결)
    const union = (x: number, y: number) => {
        const rootX = find(x);
        const rootY = find(y);
        if (rootX !== rootY) {
            parent[rootY] = rootX; // 루트 노드 통합
            return true; // 연결 성공
        }
        return false; // 이미 연결된 경우
    };


    useEffect(() => {
        setParent(Array.from({ length: n }, (_, idx) => idx))
    }, []);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isPlaying && current < costs.length) {
            intervalId = setInterval(() => {
                setCurrent(perv => {
                    if (perv < costs.length - 1) {
                        const [a, b, cost] = costs[perv];
                        if (union(a, b)) {
                            setSum(p => p + cost); // 간선 선택
                        }
                        return perv + 1
                    } else {
                        setIsPlaying(false)
                        return perv
                    }
                })
            }, 1000)
        }
        return () => { // 클로저 함수
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [parent, isPlaying, current]);

    const reset = () => {
        setIsPlaying(false)
        setParent(Array.from({ length: n }, (_, idx) => idx))
        setSum(0)
        setCurrent(0)
    }

    return (


        <NameScriptLayout title='섬 연결하기' hrefLink='https://school.programmers.co.kr/learn/courses/30/lessons/42861'>
            <div className="flex flex-col items-center space-y-1 ">
                <Button
                    variant={isPlaying ? "secondary" : "default"}
                    className={`${isPlaying ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    onClick={() => {
                        if (current === costs.length - 1) reset()
                        setIsPlaying(!isPlaying)
                    }}
                >
                    {isPlaying ? '정지' : '시작'}
                </Button>
                <Button variant="outline" onClick={reset}>리셋</Button>
            </div>

            {/* 메인 컨텐츠 */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* 왼쪽: 연결 가능 다리 */}
                <div className='flex flex-col items-center'>
                    <h3 className='font-semibold text-base sm:text-lg mb-4'>연결 가능 다리</h3>
                    <div className='w-full overflow-y-auto max-h-[400px] pr-2 rounded-lg border border-gray-100 p-4'>
                        <div className='flex flex-col gap-3'>
                            {costs.map((item, i) => (
                                <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white
                        ${i === current ? 'bg-green-500' : 'bg-zinc-400'}`}>
                                            {item[0]}
                                        </div>
                                        <div className="text-gray-400">→</div>
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white
                        ${i === current ? 'bg-green-500' : 'bg-zinc-400'}`}>
                                            {item[1]}
                                        </div>
                                    </div>
                                    <div className='font-medium'>${item[2]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 연결된 섬 상태 */}
                <div className='flex flex-col items-center'>
                    <h3 className='font-semibold text-base sm:text-lg mb-4'>연결된 섬</h3>
                    <div className='w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center'>
                        <div className='flex flex-wrap justify-center gap-2 mb-6'>
                            {parent.map((item, i) => (
                                <div
                                    key={i}
                                    className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white
                      ${item === 0 ? 'bg-green-500' : 'bg-zinc-400'}`}
                                >
                                    {i}
                                </div>
                            ))}
                        </div>
                        <div className='text-lg font-semibold'>
                            최소 비용: ${sum}
                        </div>
                    </div>
                </div>
            </div>
        </NameScriptLayout>
    )
}

export default ConnectingIsland