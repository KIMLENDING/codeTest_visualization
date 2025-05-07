"use client"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useState } from "react";


export function InfiniteList() {
    const [items, setItems] = useState(Array.from({ length: 5 }, (_, i) => i));

    const loadMore = () => {
        setItems((prev) => [...prev, ...Array.from({ length: 5 }, (_, i) => prev.length + i)]);
    };

    const { lastItemRef } = useInfiniteScroll(loadMore); // useInfiniteScroll 훅을 사용하여 마지막 아이템을 관찰함
    // loadMore 함수는 새로운 아이템을 추가하는 역할을 함
    // 마지막 아이템이 뷰포트에 보일 때 loadMore가 호출됨

    return (
        <div className="space-y-2">
            {items.map((item, i) => (
                <div
                    key={item}
                    className="border p-4 rounded"
                    ref={i === items.length - 1 ? lastItemRef : undefined} // 마지막 아이템에 ref를 설정하여 관찰함
                >
                    아이템 {item}
                </div>
            ))}
        </div>
    );
}
