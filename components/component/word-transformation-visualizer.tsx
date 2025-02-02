import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, RotateCw, MoveRight, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

interface WordTransformationProps {
  beginWord?: string;
  targetWord?: string;
  wordList?: string[];
}

const WordTransformationVisualizer = ({
  beginWord = "hit",
  targetWord = "cog",
  wordList = ["hot", "dot", "dog", "lot", "log", "cog"]
}: WordTransformationProps) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  // 한 글자 차이나는지 확인
  const isOneLetterDiff = (word1: string, word2: string): boolean => {
    let diffCount = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) diffCount++;
      if (diffCount > 1) return false;
    }
    return diffCount === 1;
  };

  // 모든 가능한 변환 경로 찾기
  const findAllPaths = (): string[][] => {
    const paths: string[][] = [];

    const dfs = (
      current: string,
      path: string[],
      visited: Set<string>
    ): void => {
      if (current === targetWord) {
        paths.push([...path]);
        return;
      }

      for (const word of wordList) {
        if (!visited.has(word) && isOneLetterDiff(current, word)) {
          visited.add(word);
          dfs(word, [...path, word], visited);
          visited.delete(word);
        }
      }
    };

    dfs(beginWord, [beginWord], new Set([beginWord]));
    return paths;
  };

  const paths: string[][] = findAllPaths();
  const shortestPath = paths.reduce<string[] | null>((shortest: string[] | null, current: string[]): string[] | null =>
    !shortest || current.length < shortest.length ? current : shortest
    , null);

  const startAnimation = (): void => {
    setIsAnimating(true);
    setStep(0);
    setCurrentPath(shortestPath || []);
  };

  useEffect(() => {
    if (isAnimating && step < (shortestPath?.length || 0)) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isAnimating, step, shortestPath?.length]);

  const highlightDifference = (word1: string | null, word2: string | null): React.ReactNode => {
    if (!word1 || !word2) return word1 || word2;
    return Array.from(word1).map((char, i) => (
      <span
        key={i}
        className={char !== word2[i] ? "text-red-500 font-bold" : ""}
      >
        {char}
      </span>
    ));
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className='flex flex-row items-center gap-2'>
          <CardTitle>단어 변환 시각화</CardTitle>
          <Link href={'https://school.programmers.co.kr/learn/courses/30/lessons/43163'}>
            <SquareArrowOutUpRight />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 시작 단어와 목표 단어 표시 */}
          <div className="flex items-center justify-center space-x-4 bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">시작 단어</div>
              <div className="font-bold text-lg text-blue-600">{beginWord}</div>
            </div>
            <MoveRight className="text-gray-400" />
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">목표 단어</div>
              <div className="font-bold text-lg text-green-600">{targetWord}</div>
            </div>
          </div>

          {/* 사용 가능한 단어 목록 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-2">사용 가능한 단어 목록</div>
            <div className="flex flex-wrap gap-2">
              {wordList.map((word) => (
                <div
                  key={word}
                  className={`px-3 py-1 rounded-full text-sm ${currentPath.slice(0, step + 1).includes(word)
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-200 text-gray-600'
                    }`}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={startAnimation}
              className="flex items-center space-x-2"
              disabled={isAnimating}
            >
              <RotateCw className="w-4 h-4" />
              <span>변환 과정 보기</span>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {currentPath.slice(0, step + 1).map((word, index) => (
              <div className='flex items-center' key={index}>
                <div className="flex flex-col items-center">
                  <div className={`p-4 rounded-lg min-w-20 text-center ${word === beginWord ? 'bg-blue-100' :
                    word === targetWord ? 'bg-green-100' :
                      'bg-gray-100'
                    }`}>
                    {highlightDifference(
                      word,
                      index > 0 ? currentPath[index - 1] : null
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Step {index}
                  </div>
                </div>
                {index < step - 1 && (
                  <ArrowRight className="text-gray-400 ml-3 mb-5" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-600">
              총 {paths.length}개의 가능한 경로 중 최단 경로: {shortestPath ? shortestPath.length - 1 : 0} 단계
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordTransformationVisualizer;