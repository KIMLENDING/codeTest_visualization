'use client';
import { useUndoRedo } from '@/hooks/useUndoRedo';

export function CounterWithUndo() {
    const { state, set, undo, redo, canUndo, canRedo } = useUndoRedo(0);

    return (
        <div className="space-y-4 p-4">
            <div className="text-2xl">현재 값: {state}</div>
            <div className="space-x-2">
                <button onClick={() => set(state + 1)} className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg hover:bg-indigo-700">+1</button>
                <button onClick={() => set(state - 1)} className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg hover:bg-indigo-700">-1</button>
                <button onClick={undo} disabled={!canUndo} className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg hover:bg-indigo-700">Undo</button>
                <button onClick={redo} disabled={!canRedo} className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg hover:bg-indigo-700">Redo</button>
            </div>
        </div>
    );
}
