'use client';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { Divide, Flag, SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '../ui/button';

const Ranking = () => {
    const n = 5;
    const results = [
        [4, 3],
        [4, 2],
        [3, 2],
        [1, 2],
        [2, 5],
    ];
    const base = Array.from({ length: n + 1 }, () => Array(n + 1).fill("N"));
    const [dist, setDist] = useState(base);
    const [play, setPlay] = useState(false);
    const [k, setK] = useState(1);
    const [i, setI] = useState(1);
    const [j, setJ] = useState(1);


    const initialization = () => {
        const newDist = base.map(row => [...row]);
        for (const [win, lose] of results) {
            newDist[win][lose] = '승';
            newDist[lose][win] = '패';
        }
        setDist(newDist);
        setK(1);
        setI(1);
        setJ(1);

    };

    const Floyd_Warshall = () => {
        if (!play) return;

        const newDist = dist.map(row => [...row]);
        let localChanged = false;

        if (newDist[i][k] === "승" && newDist[k][j] === "승" && newDist[i][j] !== "승") {
            newDist[i][j] = "승";
            localChanged = true;
        }
        if (newDist[i][k] === "패" && newDist[k][j] === "패" && newDist[i][j] !== "패") {
            newDist[i][j] = "패";
            localChanged = true;
        }

        if (localChanged) {
            setDist(newDist);

            setPlay(false);
            return;
        }

        // 다음 인덱스로 이동
        if (j === n) {
            if (i === n) {
                if (k === n) {
                    // 변화가 없었다면 알고리즘 종료

                    setPlay(false);
                } else {
                    setK(k + 1);
                    setI(1);
                    setJ(1);
                }
            } else {
                setI(i + 1);
                setJ(1);
            }
        } else {
            setJ(j + 1);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            Floyd_Warshall();
        }, 100); // 각 단계를 보여주기 위한 딜레이

        return () => clearTimeout(timer);
    }, [play, i, j, k, dist]);

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex flex-row items-center gap-2">
                    <CardTitle className="text-xl sm:text-2xl">순위 시각화</CardTitle>
                    <Link href={'https://school.programmers.co.kr/learn/courses/30/lessons/49191'}>
                        <SquareArrowOutUpRight className="h-5 w-5" />
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                {i === 1 && j === 1 && k === 1 && dist.every(row => row.every(cell => cell === 'N')) ? (
                    <Button onClick={initialization}>시작</Button>
                ) : (
                    <Button onClick={() => setPlay(!play)}>
                        {play ? "일시정지" : i === n && k === n && j === n ? <div onClick={initialization}>초기화</div> : '알고리즘 실행'}
                    </Button>
                )}
                <div className="mt-2">
                    단계: k={k}, i={i}, j={j}
                </div>
                {dist.map((items, index) => (
                    index !== 0 &&
                    <div key={index} className='flex flex-row'>
                        {items.map((item, idx) => (
                            idx !== 0 &&
                            <div key={idx}
                                className={`m-0.5 sm:m-2 p-1 sm:p-2 rounded-lg border
                                    w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center text-sm sm:text-base
                                    ${item === '승' ? 'bg-green-400' :
                                        item === '패' ? 'bg-red-500' :
                                            'bg-zinc-200 border-gray-300'}
                                    ${idx === j && index === i ? 'ring-2 ring-blue-500' : ''}
                                    ${idx === k || index === k ? 'ring-2 ring-yellow-500' : ''}`}>
                                {item}
                            </div>
                        ))}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default Ranking