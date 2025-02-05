import React, { useState, } from 'react';
import NameScriptLayout from '../layout/nameScriptLayout';

const NetworkVisualization = () => {
  const [networkState, setNetworkState] = useState({
    n: 4,
    computers: [
      [1, 1, 0, 0],
      [1, 1, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 1],
    ],
    visited: Array(4).fill(false) as boolean[],
    currentNode: null as number | null,
    networkCount: 0 as number,
    isRunning: false as boolean,
    log: [] as string[],
  });

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));



  const runDFS = async (start: number, visited: boolean[], computers: number[][]): Promise<void> => {
    visited[start] = true;
    setNetworkState((prev) => ({
      ...prev,
      visited: [...visited],
      currentNode: start,
      log: [...prev.log, `컴퓨터 ${start}번 방문 중`]
    }));
    await sleep(1000);

    for (let i = 0; i < computers.length; i++) {
      if (computers[start][i] && !visited[i]) {
        await runDFS(i, visited, computers);
      }
    }
  };

  const startVisualization = async () => {
    setNetworkState(prev => ({
      ...prev,
      visited: Array(prev.n).fill(false),
      currentNode: null,
      networkCount: 0,
      isRunning: true,
      log: []
    }));

    const visited = Array(networkState.n).fill(false);
    let count = 0;

    for (let i = 0; i < networkState.n; i++) {
      if (!visited[i]) {
        count++;
        setNetworkState(prev => ({
          ...prev,
          networkCount: count,
          log: [...prev.log, `새로운 네트워크 ${count}번 시작 (컴퓨터 ${i}번부터)`]
        }));
        await runDFS(i, visited, networkState.computers);
      }
    }

    setNetworkState(prev => ({
      ...prev,
      isRunning: false,
      log: [...prev.log, `탐색 완료! 총 ${count}개의 네트워크를 찾았습니다.`]
    }));
  };

  return (

    <NameScriptLayout title='네트워크 시각화' hrefLink='https://school.programmers.co.kr/learn/courses/30/lessons/43162'>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">연결 상태 매트릭스</h3>
          <div className="grid grid-cols-4 gap-1 max-w-[240px] sm:max-w-none mx-auto">
            {networkState.computers.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`
                        w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center text-sm sm:text-base
                        border rounded
                        ${cell ? 'bg-blue-200' : 'bg-gray-100'}
                        ${networkState.currentNode === i ? 'ring-2 ring-blue-500' : ''}
                        ${networkState.visited[i] ? 'border-blue-500' : 'border-gray-300'}
                      `}
                >
                  {cell}
                </div>
              ))
            )}
          </div>
          <div className="mt-2 text-xs sm:text-sm text-gray-600">
            <p>1: 연결됨, 0: 연결되지 않음</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">현재 상태</h3>
          <div className="space-y-2">
            <p className="text-sm sm:text-base">발견된 네트워크 수: {networkState.networkCount}</p>
            <p className="text-sm sm:text-base">현재 확인 중인 컴퓨터: {networkState.currentNode !== null ? `${networkState.currentNode}번` : '없음'}</p>
            <button
              className={`w-full sm:w-auto px-4 py-2 rounded text-sm sm:text-base ${networkState.isRunning
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              onClick={startVisualization}
              disabled={networkState.isRunning}
            >
              {networkState.isRunning ? '실행 중...' : '시각화 시작하기'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">실행 기록</h3>
        <div className="h-32 sm:h-40 overflow-y-auto border rounded p-2 bg-gray-50">
          {networkState.log.map((entry, i) => (
            <div key={i} className="text-xs sm:text-sm">
              {entry}
            </div>
          ))}
        </div>
      </div>

    </NameScriptLayout>

  );
};

export default NetworkVisualization;
