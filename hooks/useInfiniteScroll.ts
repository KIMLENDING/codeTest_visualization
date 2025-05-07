import { useRef, useCallback } from 'react';

type Options = {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
};

export function useInfiniteScroll(callback: () => void, options?: Options) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastItemRef = useCallback(

        (node: Element | null) => {
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) callback(); // entry.isIntersecting은 요소가 뷰포트에 보이는지 여부를 나타냄
                },
                {
                    root: options?.root || null,
                    rootMargin: options?.rootMargin || '0px',
                    threshold: options?.threshold || 1.0,
                }
            );

            if (node) observerRef.current.observe(node);
        },
        [callback, options?.root, options?.rootMargin, options?.threshold]
    );

    return { lastItemRef }; // lastItemRef는 마지막 아이템을 참조하는 콜백 함수로, 이 함수를 마지막 아이템에 ref로 전달하면 됨
}
