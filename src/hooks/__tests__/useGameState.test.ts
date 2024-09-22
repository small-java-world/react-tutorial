import { act, renderHook } from '@testing-library/react';
import { useGameState } from '../useGameState';

describe('useGameState', () => {
    it('should initialize with correct state', () => {
        const { result } = renderHook(() => useGameState());

        expect(result.current.state.history).toHaveLength(1);
        expect(result.current.state.history[0].squares).toEqual(Array(9).fill(null));
        expect(result.current.state.currentMove).toBe(0);
        expect(result.current.currentStatus).toBe('Next player: X');
    });

    it('should handle square click and update state', () => {
        const { result } = renderHook(() => useGameState());
        act(() => {
            result.current.handleClick(0);
        });
        expect(result.current.state.history).toHaveLength(2);
        expect(result.current.state.history[1].squares[0]).toBe('X');
        expect(result.current.currentStatus).toBe('Next player: O');
    });

    it('should not update state if square is already filled or game is won', () => {
        const { result } = renderHook(() => useGameState());
        act(() => {
            result.current.handleClick(0);
            result.current.handleClick(0);
        });
        expect(result.current.state.history).toHaveLength(2);
        expect(result.current.state.history[1].squares[0]).toBe('X');

        expect(result.current.currentStatus).toBe('Next player: O');
    });

    it('should handle jumpTo and update currentMove', () => {
        const { result } = renderHook(() => useGameState());
        act(() => {
            result.current.handleClick(0);
            result.current.handleClick(1);
            result.current.handleJumpTo(0);
        });
        expect(result.current.state.currentMove).toBe(0);
        expect(result.current.currentStatus).toBe('Next player: X');
    });

    it('should calculate Next Player correctly', () => {
        const { result } = renderHook(() => useGameState());

        act(() => {
            result.current.handleClick(0); // X
            result.current.handleClick(1); // O
            result.current.handleClick(3); // X
            result.current.handleClick(2); // O
            result.current.handleClick(6); // X wins
        });
        expect(result.current.state.currentMove).toBe(5);
        expect(result.current.currentSquares).toEqual(['X', 'O', 'O', 'X', null, null, 'X', null, null]);
        expect(result.current.currentStatus).toBe('Winner: X');
    });


});