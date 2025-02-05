'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, DicesIcon, RotateCcw, } from 'lucide-react';
import NameScriptLayout from '../layout/nameScriptLayout';

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
    <NameScriptLayout title='숫자 게임 시각화' hrefLink='https://school.programmers.co.kr/learn/courses/30/lessons/12987'>
      <div className="flex flex-col items-center space-y-1 ">
        <div className="space-y-4">
          {currentStep === -1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">원본 배열 A:</h3>
                <div className="flex flex-wrap gap-1">
                  {A.map((num, i) => (
                    <div
                      key={i}
                      className="p-1 sm:p-2 rounded-lg bg-white border border-gray-300 w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center text-sm sm:text-base"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">원본 배열 B:</h3>
                <div className="flex flex-wrap gap-1">
                  {B.map((num, i) => (
                    <div
                      key={i}
                      className="p-1 sm:p-2 rounded-lg bg-white border border-gray-300 w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center text-sm sm:text-base"
                    >
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
                <div className="flex flex-wrap gap-1">
                  {sortedA.map((num, i) => (
                    <div
                      key={i}
                      className={`${getItemStyle(sortedA, i, pointerA)} w-8 sm:w-12 h-8 sm:h-12 text-sm sm:text-base`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">정렬된 배열 B:</h3>
                <div className="flex flex-wrap gap-1">
                  {sortedB.map((num, i) => (
                    <div
                      key={i}
                      className={`${getItemStyle(sortedB, i, pointerB)} w-8 sm:w-12 h-8 sm:h-12 text-sm sm:text-base`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-base sm:text-lg font-semibold">
                현재 점수: {score}
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-2 sm:space-x-4">
            <Button
              onClick={nextStep}
              disabled={isComplete}
              className="text-sm sm:text-base"
            >
              {currentStep === -1 ? '시작' : '다음 단계'}
              <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              onClick={() => {
                reset();
                setDices(dices => !dices);
              }}
              variant="outline"
              className="text-sm sm:text-base"
            >
              <DicesIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <RotateCcw className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>

          {isComplete && (
            <div className="text-center text-base sm:text-lg font-semibold text-green-600">
              완료! 최종 점수: {score}
            </div>
          )}
        </div>
      </div>
    </NameScriptLayout>
  );
};

export default ArrayComparisonVisualizer;
