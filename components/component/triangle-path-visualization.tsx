import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SquareArrowOutUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';

const TrianglePathVisualization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [triangle, setTriangle] = useState([
    [7],
    [3, 8],
    [8, 1, 0],
    [2, 7, 4, 4],
    [4, 5, 2, 6, 5]
  ]);
  const [steps, setSteps] = useState<{ triangle: number[][]; highlighted: number[][]; description: string; maxCell?: number[] }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const stepsArray: { triangle: number[][]; highlighted: number[][]; description: string; maxCell?: number[] }[] = [];
    const triangleCopy = triangle.map(row => [...row]);

    stepsArray.push({
      triangle: triangle.map(row => [...row]),
      highlighted: [],
      description: "초기 상태"
    });

    for (let i = 1; i < triangleCopy.length; i++) {
      for (let j = 0; j < triangleCopy[i].length; j++) {
        const left = triangleCopy[i - 1][j - 1] || 0;
        const right = triangleCopy[i - 1][j] || 0;
        const max = Math.max(left, right);
        triangleCopy[i][j] += max;

        stepsArray.push({
          triangle: triangleCopy.map(row => [...row]),
          highlighted: [[i, j], [i - 1, j - 1], [i - 1, j]].filter(([x, y]) =>
            x >= 0 && y >= 0 && y < triangleCopy[x].length
          ),
          description: `(${i},${j}) 위치: ${triangleCopy[i][j] - max} + max(${left}, ${right}) = ${triangleCopy[i][j]}`
        });
      }
    }

    const lastRow = triangleCopy[triangleCopy.length - 1];
    const maxValue = Math.max(...lastRow);
    const maxIndex = lastRow.indexOf(maxValue);

    const lastStep = stepsArray[stepsArray.length - 1];
    lastStep.maxCell = [triangleCopy.length - 1, maxIndex];
    lastStep.description = `최종 결과: 최대 경로 합은 ${maxValue}입니다.`;

    setSteps(stepsArray);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev === steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, steps.length]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  interface Step {
    triangle: number[][];
    highlighted: number[][];
    description: string;
    maxCell?: number[];
  }

  const getCellStyle = (i: number, j: number, step: Step): string => {
    if (currentStep === steps.length - 1 && step.maxCell &&
      step.maxCell[0] === i && step.maxCell[1] === j) {
      return 'bg-red-500 text-white';
    }
    if (step.highlighted.some(([x, y]) => x === i && y === j)) {
      return 'bg-blue-500 text-white';
    }
    return 'bg-gray-100';
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader >
        <div className='flex flex-row items-center gap-2'>
          <CardTitle >정수 삼각형 시각화</CardTitle>
          <Link href={'https://school.programmers.co.kr/learn/courses/30/lessons/43105'}>
            <SquareArrowOutUpRight />
          </Link>
        </div>
        <CardDescription className="text-sm text-gray-600 mb-4">{steps[currentStep]?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-1 mb-8">
          {steps[currentStep]?.triangle.map((row, i) => (
            <div
              key={i}
              className="flex justify-center"
              style={{
                paddingLeft: `${(steps[currentStep].triangle.length - row.length) * 2}rem`,
                paddingRight: `${(steps[currentStep].triangle.length - row.length) * 2}rem`
              }}
            >
              {row.map((num, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`w-12 h-12 flex items-center justify-center m-1 rounded-full
                ${getCellStyle(i, j, steps[currentStep])}
                transition-colors duration-300`}
                >
                  {num}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            이전
          </button>
          <button
            onClick={togglePlay}
            className="px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? '일시정지' : '재생'}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            다음
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          단계: {currentStep + 1} / {steps.length}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrianglePathVisualization;
