import { act, renderHook } from '@testing-library/react';
import { useGameState } from '../use-game-state';

describe('useGameState', () => {
    test('initializes with correct stat', () => {
        // useGameStateをrenderHookを利用してモック化
        const { result } = renderHook(() => useGameState());

        // 初期化されたstateが正しいか確認
        expect(result.current.state.history).toHaveLength(1);
        expect(result.current.state.history[0].squares).toEqual(Array(9).fill(null));
        expect(result.current.state.currentMove).toBe(0);
        expect(result.current.currentStatus).toBe('Next player: X');
    });

    test('updates state correctly when a square is clicked', () => {
        const { result } = renderHook(() => useGameState());

        // handleClickを呼び出し、stateが更新されるか確認
        act(() => {
            // Xが0番目のマスをクリック
            result.current.handleClick(0);
        });

        // state.historyが2件になっていること
        expect(result.current.state.history).toHaveLength(2);
        // 先行はXなのでstate.history[1].squares[0]が'X'になっていること
        expect(result.current.state.history[1].squares[0]).toBe('X');
        // 次のプレイヤーがXOになっていること
        expect(result.current.currentStatus).toBe('Next player: O');
    });

    test('does not update state if square is already filled', () => {
        const { result } = renderHook(() => useGameState());

        //
        act(() => {
            // Xが0番目のマスをクリック
            result.current.handleClick(0);
            // Oが再度0番目のマスをクリック
            result.current.handleClick(0);
        });

        // state.historyが3件ではなく2件になっていること
        expect(result.current.state.history).toHaveLength(2);
        // Oのクリックが無視されていること
        expect(result.current.state.history[1].squares[0]).toBe('X');
        // 次のプレイヤーがXOになっていること
        expect(result.current.currentStatus).toBe('Next player: O');
    });

    test('updates currentMove correctly when jumpTo is called', () => {
        const { result } = renderHook(() => useGameState());

        act(() => {
            // Xが0番目のマスをクリック
            result.current.handleClick(0);
            // Oが1番目のマスをクリック
            result.current.handleClick(1);
            // NavigationMenuの0番目をクリック
            result.current.handleJumpTo(0);
        });
        // currentMoveが0になっていること
        expect(result.current.state.currentMove).toBe(0);
        // 次のプレイヤーがOではなくXになっていること
        expect(result.current.currentStatus).toBe('Next player: X');
    });

    test('calculates next player correctly', () => {
        const { result } = renderHook(() => useGameState());

        act(() => {
            result.current.handleClick(0); // X
            result.current.handleClick(1); // O
            result.current.handleClick(3); // X
            result.current.handleClick(2); // O
            // この操作でXが勝利
            result.current.handleClick(6); // X
        });

        // state.currentMoveが5になっていること
        expect(result.current.state.currentMove).toBe(5);
        // state.history[5].squaresが['X', 'O', 'O', 'X', null, null, 'X', null, null]になっていること
        expect(result.current.currentSquares).toEqual(['X', 'O', 'O', 'X', null, null, 'X', null, null]);
        // 結果が'Winner: X'になっていること
        expect(result.current.currentStatus).toBe('Winner: X');
    });


});