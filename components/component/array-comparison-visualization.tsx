'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, DicesIcon, RotateCcw, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

const ArrayComparisonVisualizer = () => {
  const [A, setA] = useState([7, 5, 4, 3, 3, 2, 2]);
  const [B, setB] = useState([8, 6, 4, 4, 3, 2, 1]);
  const [dices, setDices] = useState(false);
  useEffect(() => {
    const generateRandomArray = () => {
      return Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    };

    setA(generateRandomArray());
    setB(generateRandomArray());
  }, [dices]);
  const [sortedA, setSortedA] = useState<number[]>([]);
  const [sortedB, setSortedB] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [score, setScore] = useState(0);
  const [pointerA, setPointerA] = useState(0);
  const [pointerB, setPointerB] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentStep === -1) {
      setSortedA([...A].sort((a, b) => b - a));
      setSortedB([...B].sort((a, b) => b - a));
    }
  }, [currentStep, A, B]);

  const reset = () => {
    setCurrentStep(-1);
    setScore(0);
    setPointerA(0);
    setPointerB(0);
    setIsComplete(false);
  };

  const nextStep = () => {
    if (currentStep === -1) {
      setCurrentStep(0);
      return;
    }

    if (pointerA >= sortedA.length || pointerB >= sortedB.length) {
      setIsComplete(true);
      return;
    }

    if (sortedB[pointerB] > sortedA[pointerA]) {
      setScore(prev => prev + 1);
      setPointerB(prev => prev + 1);
    }
    setPointerA(prev => prev + 1);
    setCurrentStep(prev => prev + 1);
  };

  const getItemStyle = (array: number[], index: number, currentPointer: number) => {
    const baseStyle = "p-2 m-1 rounded-lg w-12 h-12 flex items-center justify-center";
    if (index === currentPointer) {
      return `${baseStyle} bg-blue-500 text-white`;
    }
    if (index < currentPointer) {
      return `${baseStyle} bg-gray-200`;
    }
    return `${baseStyle} bg-white border border-gray-300`;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className='flex flex-row items-center gap-2'>
          <CardTitle>숫자 게임 시각화</CardTitle>
          <Link href={'https://school.programmers.co.kr/learn/courses/30/lessons/12987'}>
            <SquareArrowOutUpRight />
          </Link>
        </div>

      </CardHeader>
      <CardContent>

        <div className="space-y-6">
          {currentStep === -1 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">원본 배열 A:</h3>
                <div className="flex flex-wrap">
                  {A.map((num, i) => (
                    <div key={i} className="p-2 m-1 rounded-lg bg-white border border-gray-300 w-12 h-12 flex items-center justify-center">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">원본 배열 B:</h3>
                <div className="flex flex-wrap">
                  {B.map((num, i) => (
                    <div key={i} className="p-2 m-1 rounded-lg bg-white border border-gray-300 w-12 h-12 flex items-center justify-center">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep >= 0 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">정렬된 배열 A:</h3>
                <div className="flex flex-wrap">
                  {sortedA.map((num, i) => (
                    <div key={i} className={getItemStyle(sortedA, i, pointerA)}>
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">정렬된 배열 B:</h3>
                <div className="flex flex-wrap">
                  {sortedB.map((num, i) => (
                    <div key={i} className={getItemStyle(sortedB, i, pointerB)}>
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-lg font-semibold">
                현재 점수: {score}
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <Button
              onClick={nextStep}
              disabled={isComplete}
            >
              {currentStep === -1 ? '시작' : '다음 단계'} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            {/* <Button
              onClick={reset}
              variant="outline"
            >
              재시작 <RotateCcw className="ml-2 h-4 w-4" />
            </Button> */}
            <Button
              onClick={() => {
                reset();
                setDices(dices => !dices);
              }}
              variant="outline"
            >
              <DicesIcon /> <RotateCcw className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {isComplete && (
            <div className="text-center text-lg font-semibold text-green-600">
              완료! 최종 점수: {score}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArrayComparisonVisualizer;
