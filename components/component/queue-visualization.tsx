import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import NameScriptLayout from '../layout/nameScriptLayout';

const QueueVisualization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed] = useState(1000);

  const operations = [
    "I -45", "I 653", "D 1", "I -642",
    "I 45", "I 97", "D 1", "D -1", "I 333"
  ];

  const getStateAtStep = (step: number) => {
    const array = [];
    for (let i = 0; i <= step; i++) {
      const [op, num] = operations[i].split(" ");
      if (op === "I") {
        array.push(Number(num));
      } else if (op === "D" && array.length > 0) {
        if (num === "1") {
          array.splice(array.indexOf(Math.max(...array)), 1);
        } else if (num === "-1") {
          array.splice(array.indexOf(Math.min(...array)), 1);
        }
      }
    }
    return array;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < operations.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= operations.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, operations.length, speed]);

  const getCurrentArray = () => getStateAtStep(currentStep);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < operations.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentArray = getCurrentArray();
  const [op, num] = operations[currentStep].split(" ");

  return (

    <NameScriptLayout title='이중우선순위큐 시각화' hrefLink='https://school.programmers.co.kr/learn/courses/30/lessons/42628'>
      {/* <div className="flex flex-col items-center space-y-1 mb-8"> */}

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {operations.map((item, i) => (
          <div
            key={i}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white font-medium text-sm sm:text-base
                ${i <= currentStep ? 'bg-blue-500' : 'bg-zinc-400'}`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
        <button
          onClick={handleStepBack}
          className="p-1.5 sm:p-2 rounded hover:bg-gray-100"
          disabled={currentStep === 0}
        >
          <SkipBack className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handlePlayPause}
          className="p-1.5 sm:p-2 rounded hover:bg-gray-100"
        >
          {isPlaying ?
            <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> :
            <Play className="w-5 h-5 sm:w-6 sm:h-6" />
          }
        </button>

        <button
          onClick={handleStepForward}
          className="p-1.5 sm:p-2 rounded hover:bg-gray-100"
          disabled={currentStep === operations.length - 1}
        >
          <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleReset}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm sm:text-base"
        >
          리셋
        </button>
      </div>

      <div className="mb-6 text-center">
        <div className="text-base sm:text-lg font-medium">
          현재 연산: <span className="font-bold">{operations[currentStep]}</span>
        </div>
        <div className="text-xs sm:text-sm text-gray-600">
          {op === 'I' ?
            `${num} 삽입` :
            `${num === '1' ? '최대값' : '최소값'} 삭제`
          }
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {currentArray.map((value, index) => (
          <div
            key={index}
            className={`
                px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white font-medium text-sm sm:text-base
                ${value === Math.max(...currentArray) ? 'bg-blue-600' :
                value === Math.min(...currentArray) ? 'bg-red-600' :
                  'bg-gray-500'}
              `}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="text-xs sm:text-sm text-gray-600 text-center">
        단계: {currentStep + 1} / {operations.length}
      </div>
    </NameScriptLayout>

  );
};

export default QueueVisualization;
