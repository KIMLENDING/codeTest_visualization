import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

interface Route {
  start: number;
  end: number;
}

const RouteVisualization = () => {
  const [step, setStep] = useState<number>(0);
  const [routes, setRoutes] = useState<Route[]>([
    { start: -20, end: -15 },
    { start: -14, end: -5 },
    { start: -18, end: -13 },
    { start: -5, end: -3 }
  ]);
  const [cameras, setCameras] = useState<number[]>([]);
  const [newStart, setNewStart] = useState<string>("");
  const [newEnd, setNewEnd] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const minX = Math.min(...routes.map(r => r.start)) - 2;
  const maxX = Math.max(...routes.map(r => r.end)) + 2;
  const width = maxX - minX;

  const getXPosition = (x: number): number => {
    return ((x - minX) / width) * 100;
  };

  const addNewRoute = () => {
    const start = parseInt(newStart);
    const end = parseInt(newEnd);

    if (isNaN(start) || isNaN(end)) {
      alert("유효한 숫자를 입력해주세요.");
      return;
    }

    if (start >= end) {
      alert("시작 지점은 종료 지점보다 작아야 합니다.");
      return;
    }

    const newRoutes = [...routes, { start, end }].sort((a, b) => a.end - b.end);
    setRoutes(newRoutes);
    setNewStart("");
    setNewEnd("");
    reset();
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isAnimating && step < routes.length) {
      timeoutId = setTimeout(() => {
        nextStep();
      }, 1000);
    } else if (step >= routes.length) {
      setIsAnimating(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isAnimating, step]);

  const nextStep = () => {
    if (step < routes.length) {
      const currentRoute = routes[step];
      const lastCamera = cameras[cameras.length - 1] || -30001;

      if (lastCamera < currentRoute.start) {
        setCameras([...cameras, currentRoute.end]);
      }
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setCameras([]);
    setIsAnimating(false);
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className='flex flex-row items-center gap-2'>
          <CardTitle>단속카메라 시각화</CardTitle>
          <Link href={'https://school.programmers.co.kr/learn/courses/30/lessons/42884'}>
            <SquareArrowOutUpRight />
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4 items-center">
            <Input
              type="number"
              value={newStart}
              onChange={(e) => setNewStart(e.target.value)}
              placeholder="시작 지점"
              className="w-32"
            />
            <Input
              type="number"
              value={newEnd}
              onChange={(e) => setNewEnd(e.target.value)}
              placeholder="종료 지점"
              className="w-32"
            />
            <Button onClick={addNewRoute}>
              경로 추가
            </Button>
          </div>

          <div className="relative h-64 border rounded-lg p-4 overflow-y-auto">
            <div className="relative min-h-full">
              {routes.map((route, idx) => (
                <div
                  key={idx}
                  className={`absolute h-8 rounded-full transition-all duration-500 ${idx < step ? 'bg-blue-200' : 'bg-gray-200'
                    }`}
                  style={{
                    left: `${getXPosition(route.start)}%`,
                    width: `${getXPosition(route.end) - getXPosition(route.start)}%`,
                    top: `${(idx * 40) + 20}px`,
                  }}
                />
              ))}

              {cameras.map((pos, idx) => (
                <div
                  key={`camera-${idx}`}
                  className="absolute transform -translate-x-1/2 transition-all duration-500"
                  style={{
                    left: `${getXPosition(pos)}%`,
                    top: '0px'
                  }}
                >
                  <Camera className="text-red-500" size={24} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={toggleAnimation}
              disabled={step >= routes.length}
            >
              {isAnimating ? "일시정지" : "자동 재생"}
            </Button>
            <Button
              onClick={nextStep}
              disabled={step >= routes.length || isAnimating}
            >
              다음 단계
            </Button>
            <Button
              onClick={reset}
              variant="outline"
            >
              초기화
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            진행 단계: {step}/{routes.length} | 설치된 카메라: {cameras.length}개
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">현재 경로 목록:</h3>
            <div className="max-h-40 overflow-y-auto border rounded-lg p-2">
              {routes.map((route, idx) => (
                <div key={idx} className="text-sm py-1">
                  경로 {idx + 1}: [{route.start}, {route.end}]
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteVisualization;
