'use client';
import React, { useState, useEffect } from 'react';
import { Wifi, Play, Pause, RotateCcw } from 'lucide-react';
import NameScriptLayout from '../layout/nameScriptLayout';

interface StationVisualizerProps {
  n?: number;
  stations?: number[];
  w?: number;
}

const StationVisualizer = ({
  n = 12,
  stations = [4, 11],
  w = 1
}: StationVisualizerProps) => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [activeStations, setActiveStations] = useState<number[]>([]); //활성화된 기지국
  const [isPlaying, setIsPlaying] = useState(false); //애니메이션 재생 여부
  const [currentStep, setCurrentStep] = useState(0); //현재 스탭 (1은 초기 stations 배열 보여줌) 0은 기지국 건설 전 상태

  // 기지국 솔루션 함수
  const calculateNewStations = () => {
    const cover = 2 * w + 1;
    const newStations = [];
    let current = 1;

    for (const station of stations) {
      const left = station - w;
      const right = station + w;

      if (current < left) {
        const gap = left - current;
        const count = Math.ceil(gap / cover);

        for (let i = 0; i < count; i++) {
          // newStations.push(current + i * cover); // 시작값에 기지국 설치
          newStations.push(current + i * cover + Math.floor(w)); // 중간값에 기지국 설치
        }
      }
      current = right + 1;
    }
    if (current <= n) {

      const gap = n - current + 1;
      const count = Math.ceil(gap / cover); //필요한 기지국 개수
      console.log(count, gap)

      for (let i = 0; i < count; i++) {
        if (count !== 1 && gap % count === 0) {

          newStations.push(current + i * cover); // 시작값에에 기지국 설치
        } else {

          newStations.push(current + i * cover + Math.floor(w)); // 중간값에 기지국 설치
        }
      }
    }

    return newStations;//새로운 기지국 위치 배열
  };

  const newStations = calculateNewStations(); //새로운 기지국 위치 배열

  const totalSteps = newStations.length + 1; //전체 스탭 수 (+1은 초기 상태(stations배열))

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    // 인터벌 함수에서 state를 사용할 때 클로저 문제가 발생할 수 있음 (캡쳐된 값이 최신값이 아닐 수 있음)

    if (isPlaying && currentStep < totalSteps) {
      intervalId = setInterval(() => {
        setCurrentStep(prev => {

          if (prev < totalSteps) {
            if (prev === 0) {
              setActiveStations([...stations]);
            } else {
              setActiveStations([...activeStations, newStations[prev - 1]]);

              // setActiveStations(prevStations => {

              //   console.log(prevStations, prev, currentStep);
              //   return [...prevStations, newStations[prev - 1]]
              // }); // 이러면 중복으로 newStations[prev - 1]이 값을 업데이트함 

            }
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1500);
    }

    return () => { // 클로저 함수
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, currentStep, totalSteps]);

  const resetAnimation = () => {
    setCurrentStep(0);
    setActiveStations([]);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentStep === totalSteps - 1) {

      resetAnimation();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // 각 위치의 커버리지 상태 확인
  const getCoverageStatus = (position: number) => {
    // 현재 활성화된 기지국들의 커버리지 체크
    for (const station of activeStations) {
      if (Math.abs(station - position) <= w) {
        return stations.includes(station) ? 'existing' : 'new';
      }
    }
    return 'uncovered';
  };

  // 기지국 위치 표시 함수
  const isStation = (position: number) => activeStations.includes(position);
  const getStationType = (position: number) => {
    if (stations.includes(position)) return 'existing';
    if (newStations.includes(position)) return 'new';
    return null;
  };
  return (
    <NameScriptLayout title='기지국 설치 시각화' hrefLink='https://school.programmers.co.kr/learn/courses/30/lessons/12979'>


      <div className="space-y-4">
        <div className='flex flex-row items-center justify-between'>
          <div className="flex  space-x-4 ">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-200"></div>
              <span>기존 커버리지</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-200"></div>
              <span>새로운 커버리지</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100"></div>
              <span>미커버 영역</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={resetAnimation}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex">
          {Array.from({ length: n }, (_, i) => i + 1).map((position) => {
            const coverage = getCoverageStatus(position);
            const stationType = getStationType(position);
            const isActive = isStation(position);

            return (
              <div
                key={position}
                className="relative flex-1"
                onMouseEnter={() => setHoveredCell(position)}
                onMouseLeave={() => setHoveredCell(null)}
              >
                <div
                  className={`
                      h-16 border border-gray-300 flex items-center justify-center
                      transition-colors duration-500
                      ${coverage === 'existing' ? 'bg-blue-200' : ''}
                      ${coverage === 'new' ? 'bg-green-200' : ''}
                      ${coverage === 'uncovered' ? 'bg-gray-100' : ''}
                      `}
                >
                  {isActive && (
                    <Wifi
                      className={`w-6 h-6 transition-all duration-500 scale-in
                      ${stationType === 'existing' ? 'text-blue-600' : 'text-green-600'}
                      `}
                    />
                  )}
                  {hoveredCell === position && (
                    <div className="absolute -top-8 bg-gray-800 text-white px-2 py-1 rounded text-sm">
                      위치: {position}
                    </div>
                  )}
                </div>
                <div className="text-center text-sm mt-1">{position}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <p className="font-medium">현재 진행 상황:</p>
          <div className="h-2 bg-gray-200 rounded-full mt-2 mb-4">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (totalSteps)) * 100}%` }}
            ></div>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>전체 길이: {n}</li>
            <li>기존 기지국 위치: {stations.join(', ')}</li>
            <li>전파 범위: {w}</li>
            <li>설치된 기지국: {activeStations.filter(s => !stations.includes(s)).length} / {newStations.length}</li>
          </ul>
        </div>
      </div>
    </NameScriptLayout>
  );
};

export default StationVisualizer;


