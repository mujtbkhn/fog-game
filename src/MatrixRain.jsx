import React, { useState, useEffect } from 'react';

const MatrixRain = () => {
    const [grid, setGrid] = useState([]);
    const [isRunning, setIsRunning] = useState(true);
    const rows = 15;
    const cols = 20;

    useEffect(() => {
        const newGrid = Array(rows).fill(null).map(() =>
            Array(cols).fill(null).map(() => ({
                active: false,
                color: 'transparent',
                opacity: 0
            }))
        );
        setGrid(newGrid);
    }, []);

    const getRandomColor = () => {
        const colors = [
            'rgb(0, 255, 0)',
            'rgb(0, 200, 255)',
            'rgb(255, 0, 255)',
            'rgb(255, 255, 0)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setGrid(prevGrid => {
                const newGrid = JSON.parse(JSON.stringify(prevGrid));

                for (let i = rows - 1; i >= 0; i--) {
                    for (let j = 0; j < cols; j++) {
                        if (i === rows - 1) {
                            newGrid[i][j].active = false;
                            newGrid[i][j].opacity = 0;
                        } else if (newGrid[i][j].active) {
                            newGrid[i + 1][j] = {
                                active: true,
                                color: newGrid[i][j].color,
                                opacity: newGrid[i][j].opacity - 0.2
                            };
                            newGrid[i][j].active = false;
                            newGrid[i][j].opacity = 0;
                        }
                    }
                }

                for (let j = 0; j < cols; j++) {
                    if (Math.random() < 0.1) {
                        newGrid[0][j] = {
                            active: true,
                            color: getRandomColor(),
                            opacity: 1
                        };
                    }
                }

                return newGrid;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div className="p-6 bg-gray-900 max-w-4xl mx-auto rounded-lg shadow-lg">
            <div className="flex flex-col items-center space-y-4">
                <h1 className="text-2xl font-bold text-white mb-4">Digital Rain</h1>
                <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                    {grid.map((row, i) => (
                        row.map((cell, j) => (
                            <div
                                key={`${i}-${j}`}
                                className="w-6 h-6 border border-gray-800 rounded-sm transition-colors duration-200"
                                style={{
                                    backgroundColor: cell.active ? cell.color : 'transparent',
                                    opacity: cell.opacity
                                }}
                            />
                        ))
                    ))}
                </div>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? 'Pause' : 'Start'}
                </button>
            </div>
        </div>
    );
};

export default MatrixRain;