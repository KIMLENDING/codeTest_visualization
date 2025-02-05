'use client';

import { useSearchParams } from 'next/navigation';
import { pagesObject } from '@/lib/data';

export default function Page() {
  const searchParams = useSearchParams();
  const select = searchParams.get('id') || '';
  const page = pagesObject.find((p) => p.title === select)?.component;

  return (
    <div>
      {page ? (
        page
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          <p className="text-center">
            왼쪽 메뉴에서 시각화할 알고리즘을 선택해주세요
          </p>
        </div>
      )}
    </div>
  );
}
