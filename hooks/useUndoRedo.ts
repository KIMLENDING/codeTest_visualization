import { useCallback, useState } from "react";

export function useUndoRedo<T>(initial: T) {
    const [past, setPast] = useState<T[]>([]); // 이전 상태를 저장하는 배열
    const [present, setPresent] = useState<T>(initial); // 현재 상태
    const [future, setFuture] = useState<T[]>([]); // 다음 상태를 저장하는 배열
    console.log(past, present, future);
    /**
     * set
     * @param newPresent - 새로운 상태
     * @description - 새로운 상태로 변경하고, 이전 상태를 past에 저장함
     */
    const set = useCallback((newPresent: T) => {
        setPast((prev) => [...prev, present]);
        setPresent(newPresent);
        setFuture([]); // redo stack 초기화
    }, [present]);

    /**
     * undo
     * @description - 이전 상태로 되돌림
     */
    const undo = useCallback(() => {
        if (past.length === 0) return;
        const prev = past[past.length - 1]; // 이전 상태
        setFuture((f) => [present, ...f]);
        setPresent(prev);
        setPast((p) => p.slice(0, p.length - 1));
    }, [past, present]);

    /**
     * redo
     * @description - 다음 상태로 되돌림
     */
    const redo = useCallback(() => {
        if (future.length === 0) return;
        const next = future[0];
        setPast((p) => [...p, present]);
        setPresent(next);
        setFuture((f) => f.slice(1));
    }, [future, present]);

    /**
     * reset
     * @param val - 초기 상태로 설정할 값
     */
    const reset = useCallback((val: T) => {
        setPast([]);
        setPresent(val);
        setFuture([]);
    }, []);

    return {
        state: present,
        set,
        undo,
        redo,
        reset,
        canUndo: past.length > 0,
        canRedo: future.length > 0,
    };
}
