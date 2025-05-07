import { useEffect, useState, RefObject } from 'react';

export function useOnScreen<T extends Element>(
    ref: RefObject<T>,
    rootMargin: string = '0px',
    threshold: number = 0.25
): boolean {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const node = ref.current; // ref.current는 DOM 요소를 가리킴
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting), // entry.isIntersecting은 요소가 뷰포트에 보이는지 여부를 나타냄
            {
                rootMargin,// rootMargin은 뷰포트의 여백을 설정하는 옵션
                threshold  // threshold: 요소의 threshold%가 보일 때 콜백을 호출함
            }
        );

        observer.observe(node); // 요소를 관찰하기 시작함

        // 컴포넌트가 언마운트될 때 관찰을 중지함
        return () => {
            if (node) observer.unobserve(node);
        };
    }, [ref, rootMargin]);

    return isIntersecting; // 요소가 뷰포트에 보이는지 여부를 반환함
}
