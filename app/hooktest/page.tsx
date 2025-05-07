import { InfiniteList } from '@/components/example/InfiniteScroll'
import { CounterWithUndo } from '@/components/example/CounterWithUndo'
import React from 'react'

const Page = () => {
    return (
        <div>
            <CounterWithUndo />
            <InfiniteList />
        </div>
    )
}

export default Page