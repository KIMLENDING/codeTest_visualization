'use client';
import { useState, useEffect } from 'react';

export default function Test3() {
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(1);
    const [t, setT] = useState(false);
    function handleClick() {
        setT(!t);
        console.log('t', t);
    }
    function handleClick2() {
        setT(!t);
        setCount(0);
        setCount1(1);
    }
    useEffect(() => {
        setCount(prev => {
            if (prev < 11 && t) {
                setCount1(pr => {
                    return pr * 2;
                })
                return prev + 1;
            }
            else return prev
        })
    }, [t,])

    useEffect(() => {
        console.log('count 렌더링 후에 실행', count);
    }, [count])
    useEffect(() => {
        console.log('count1 렌더링 후에 실행', count1);
    }, [count1])
    useEffect(() => {
        console.log('t 렌더링 후에 실행');
    }, [t])
    return (
        <div className='flex flex-col items-center'>
            <h1>Counters that update together</h1>
            <div>count: {count}</div>
            <div>count1: {count1}</div>
            <button onClick={handleClick} >button</button>
            <button onClick={handleClick2}>reset</button>
        </div>
    );
}


