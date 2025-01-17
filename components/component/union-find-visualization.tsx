import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '../ui/button';

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
        <Card className="w-full max-w-4xl">
            <CardHeader >
                <div className='flex flex-row items-center gap-2'>
                    <CardTitle >섬 연결하기</CardTitle>
                    <Link href={'https://school.programmers.co.kr/learn/courses/30/lessons/42861'}>
                        <SquareArrowOutUpRight />
                    </Link>
                </div>

            </CardHeader>
            <CardContent className='space-y-4'>

                <div className="flex flex-row gap-2">
                    <Button className={`${isPlaying && 'bg-green-400'}`} onClick={() => {
                        if (current === costs.length - 1) reset()
                        setIsPlaying(!isPlaying)

                    }}>{isPlaying ? '정지' : '시작'}</Button>
                    <Button onClick={reset}>리셋</Button>
                </div>


                <div className='flex flex-row gap-2'>

                    <div className='flex flex-col gap-2  items-center overflow-scroll max-h-96'>
                        <div className='font-semibold'>연결 가능 다리</div>

                        {costs.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">

                                <div className={`w-12 h-12 flex items-center justify-center m-1 rounded-full ${i === current ? 'bg-green-400' : 'bg-zinc-400'}`}>{item[0]} </div>
                                -
                                <div className={`w-12 h-12 flex items-center justify-center m-1 rounded-full ${i === current ? 'bg-green-400' : 'bg-zinc-400'}`}> {item[1]} </div>
                                <div className='font-semibold'>${item[2]}</div>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col gap-2  items-center flex-1'>
                        <div className='font-semibold'>연결된 섬</div>
                        <div className='flex flex-row gap-2 '>

                            {parent.map((item, i) => (

                                <span key={i} className={`w-12 h-12 flex  items-center justify-center m-1 rounded-full ${item === 0 ? 'bg-green-400' : 'bg-zinc-400'}`}>{i} </span>

                            ))}
                        </div>
                    </div>
                </div>
                <h2 className='font-semibold'>최소 비용: ${sum}</h2>
            </CardContent>
        </Card>
    )
}

export default ConnectingIsland