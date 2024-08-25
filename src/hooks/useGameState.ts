import {useCallback, useMemo, useState} from 'react';
import {GameState, SquareState, Step} from "../types/gameType";

const calculateWinner = (squares: SquareState[]) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a]
        }
    }
    return null;
}

export const useGameState = () => {
    const [state, setState] = useState<GameState>({
        history: [
            {
                squares: Array(9).fill(null),
            },
        ],
        currentMove: 0,
    })

    const winner = useMemo(() =>
        calculateWinner(state.history[state.currentMove].squares), [state.history, state.currentMove]);

    const xIsNext = state.currentMove % 2 === 0;

    const currentState = useMemo(() => {
        return winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
    }, [winner, xIsNext ]);


    function handlePlay(nextSquares: SquareState[]) {
        setState(({history, currentMove}) => {
            const nextHistory = [...state.history.slice(0, state.currentMove + 1),
                {squares: nextSquares}];
            return {
                history: nextHistory,
                currentMove: nextHistory.length -1,
            }
        })
    }

    function handleClick(squaresIndex: number) {
        const currentStep = state.history[state.currentMove];
        if (winner || currentStep?.squares[squaresIndex]) {
            return;
        }
        const squares = currentStep.squares;
        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[squaresIndex] = 'X';
        } else {
            nextSquares[squaresIndex] = 'O';
        }
        handlePlay(nextSquares);
    }

    const jumpTo = useCallback((move: number) => {
        setState(prev => ({
            ...prev,
            currentMove: move
        }))
    }, []);


    const currentSquares = state.history[state.currentMove].squares;
    return {state, currentSquares, currentState, xIsNext, handleClick, jumpTo} as const;
}