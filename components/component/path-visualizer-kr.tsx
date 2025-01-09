import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>경로 찾기 시각화 (단계 {step + 1}/{grid.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
            {grid[step]?.dp.map((row, i) => (
              <div key={i} className="flex gap-2">
                {row.map((cell, j) => (
                  <div
                    key={j}
                    className={`w-20 h-20 flex items-center justify-center border text-sm
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
            >
              이전
            </Button>
            <Button
              onClick={() => setStep(prev => Math.min(grid.length - 1, prev + 1))}
              disabled={step === grid.length - 1}
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
