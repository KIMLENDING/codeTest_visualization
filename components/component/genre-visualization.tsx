import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';

const GenreVisualization = () => {
  const genres = ["classic", "pop", "classic", "classic", "pop"];
  const plays = [500, 600, 150, 800, 2500];

  const genreMap = new Map();
  const playMap = new Map();

  genres.forEach((genre, index) => {
    if (!genreMap.has(genre)) {
      genreMap.set(genre, []);
      playMap.set(genre, 0);
    }
    genreMap.get(genre).push([index, plays[index]]);
    playMap.set(genre, playMap.get(genre) + plays[index]);
  });

  const sortedGenre = [...playMap.entries()].sort((a, b) => b[1] - a[1]);

  const genreKorean: { [key: string]: string } = {
    'classic': '클래식',
    'pop': '팝'
  };

  return (
    <section className="space-y-6 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <div className='flex flex-row items-center gap-2'>
            <CardTitle className="text-xl sm:text-2xl">베스트앨범</CardTitle>
            <Link href={'https://school.programmers.co.kr/learn/courses/30/lessons/42579'}>
              <SquareArrowOutUpRight className="h-5 w-5" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {genres.map((genre, i) => (
              <div key={i} className="border rounded p-3 sm:p-4 text-center w-[calc(50%-0.5rem)] sm:w-auto">
                <div className="font-bold mb-2 text-sm sm:text-base">{genreKorean[genre]}</div>
                <div className="text-xl sm:text-2xl">{plays[i].toLocaleString()}</div>
                <div className="text-xs sm:text-sm text-gray-500">인덱스: {i}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">장르별 총 재생 수</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {[...playMap.entries()].map(([genre, total]) => (
              <div key={genre} className="border rounded p-3 sm:p-4 w-[calc(50%-0.5rem)] sm:w-auto">
                <div className="font-bold mb-2 text-sm sm:text-base">{genreKorean[genre]}</div>
                <div className="text-xl sm:text-2xl">{total.toLocaleString()}</div>
                <div className="text-xs sm:text-sm text-gray-500">총 재생 수</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">최종 정렬 결과</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedGenre.map(([genre]) => (
              <div key={genre} className="border rounded p-3 sm:p-4">
                <div className="font-bold mb-2 text-sm sm:text-base">
                  {genreKorean[genre]} (상위 2곡)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  {genreMap.get(genre)!
                    .sort((a: [number, number], b: [number, number]) => b[1] - a[1])
                    .slice(0, 2)
                    .map(([index, play]: [number, number], i: number) => (
                      <div key={i} className="bg-blue-100 p-2 rounded text-sm sm:text-base">
                        <div>인덱스: {index}</div>
                        <div>재생 수: {play.toLocaleString()}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{i + 1}위</div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default GenreVisualization;
