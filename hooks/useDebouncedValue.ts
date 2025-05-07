import { useEffect, useState } from "react";

/**
 * useDebouncedValue
 * @param value - 원본 값
 * @param delay - debounce 지연 시간(ms)
 * @returns 지연된 값
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}
