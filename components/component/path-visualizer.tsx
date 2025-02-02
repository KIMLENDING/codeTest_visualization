import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';

const PathVisualizer = () => {
  const [step, setStep] = useState(0);
  const [grid, setGrid] = useState<{ dp: number[][]; puddles: boolean[][] }[]>([]);
  const m = 4, n = 3;
  const puddles = [[2, 2]];

  useEffect(() => {
    const calculatePaths = () => {
      const MOD = 1000000007;
      let steps = [];
      const dp = Array.from({ length: n }, () => Array(m).fill(0));
      const isPuddle = Array.from({ length: n }, () => Array(m).fill(false));
      dp[0][0] = 1;

      for (const [x, y] of puddles) {
        dp[y - 1][x - 1] = -1;
        isPuddle[y - 1][x - 1] = true;
      }

      steps.push({ dp: JSON.parse(JSON.stringify(dp)), puddles: JSON.parse(JSON.stringify(isPuddle)) });

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (dp[i][j] === -1) {
            dp[i][j] = 0;
            steps.push({ dp: JSON.parse(JSON.stringify(dp)), puddles: JSON.parse(JSON.stringify(isPuddle)) });
            continue;
          }
          if (i > 0) dp[i][j] += dp[i - 1][j] % MOD;
          if (j > 0) dp[i][j] += dp[i][j - 1] % MOD;
          dp[i][j] %= MOD;
          steps.push({ dp: JSON.parse(JSON.stringify(dp)), puddles: JSON.parse(JSON.stringify(isPuddle)) });
        }
      }
      return steps;
    };

    setGrid(calculatePaths());
  }, []);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className='flex flex-row items-center gap-2 flex-wrap'>
          <CardTitle className="text-base sm:text-xl">
            등굣길 경로 찾기
          </CardTitle>
          <div className="text-sm sm:text-base text-gray-500">
            (단계 {step + 1}/{grid.length})
          </div>
          <Link href={'https://school.programmers.co.kr/learn/courses/30/lessons/42898'}>
            <SquareArrowOutUpRight className="h-5 w-5" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-1 sm:gap-2 max-w-full overflow-x-auto pb-2">
            {grid[step]?.dp.map((row, i) => (
              <div key={i} className="flex gap-1 sm:gap-2">
                {row.map((cell, j) => (
                  <div
                    key={j}
                    className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 
                      flex items-center justify-center border text-xs sm:text-sm lg:text-base
                      ${grid[step].puddles[i][j] ? 'bg-red-200' :
                        cell > 0 ? 'bg-blue-200' : 'bg-gray-50'}`}
                  >
                    {grid[step].puddles[i][j] ? '💧' : cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => setStep(prev => Math.max(0, prev - 1))}
              disabled={step === 0}
              className="text-sm sm:text-base"
            >
              이전
            </Button>
            <Button
              onClick={() => setStep(prev => Math.min(grid.length - 1, prev + 1))}
              disabled={step === grid.length - 1}
              className="text-sm sm:text-base"
            >
              다음
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PathVisualizer;
