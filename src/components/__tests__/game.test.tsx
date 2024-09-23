import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../game';
import {NavigationMenuProp} from "../navigation-menu";
import {BoardProps} from "../board";
import * as board from "../board";
import * as navigationMenu from "../navigation-menu";
import {useGameState} from "../../hooks/use-game-state";

jest.mock('../../hooks/use-game-state');
jest.mock('../board');
jest.mock('../navigation-menu');

describe('Game Component', () => {
    let bordSpy: jest.SpyInstance;
    let navigationMenuSpy: jest.SpyInstance;
    const dummyState = {
        history: [{ squares: Array(9).fill(null) }],
        currentMove: 0
    };

    const mockUseGameState = useGameState as jest.MockedFunction<typeof useGameState>;
    const mockHandleClick = jest.fn();
    const mockHandleJumpTo = jest.fn();
    const mockCurrentStatus =  "Next player: X";

    beforeEach(() => {
        mockUseGameState.mockReturnValue({
            state: dummyState,
            currentStatus: mockCurrentStatus,
            currentSquares: dummyState.history[dummyState.currentMove].squares,
            handleClick: mockHandleClick,
            handleJumpTo: mockHandleJumpTo
        });

        bordSpy = jest.spyOn(board, "default");
        navigationMenuSpy = jest.spyOn(navigationMenu, "default");

        bordSpy.mockImplementation((props: BoardProps) => (
            <>
                <div data-testid="board" onClick={() => props.handleClick(0)} >
                    <div data-testid="board-current-status">{props.currentStatus}</div>
                    <div data-testid="board-current-square">{JSON.stringify(props.squares)}</div>
                </div>
            </>
        ));
        navigationMenuSpy.mockImplementation((props: NavigationMenuProp) => (
            <div data-testid="navigation-menu" onClick={() => props.handleJumpTo(1)}>
                {JSON.stringify(props.history)}
            </div>
        ));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Board component with correct props', () => {
        // Gameコンポーネントを描画
        render(<Game />);

        // data-testid="board"が存在するか検証
        expect(screen.getByTestId('board')).toBeInTheDocument();

        // data-testid="board-current-status"のtextContentが期待値と一致するか検証
        expect(screen.getByTestId('board-current-status').textContent).toBe(mockCurrentStatus);
        // data-testid="square"のtextContentが期待値と一致するか検証
        expect(screen.getByTestId('board-current-square').textContent).toBe(
            JSON.stringify(dummyState.history[dummyState.currentMove].squares));

        //bordSpyの呼び出し回数と呼び出し時の引数を検証
        expect(bordSpy).toHaveBeenCalledTimes(1);
        expect(bordSpy).toHaveBeenNthCalledWith(1,
            {
                currentStatus: "Next player: X",
                handleClick: expect.any(Function),
                "squares": [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                ],
            },
            {}
        );
    });

    test('renders NavigationMenu component with correct props', () => {
        render(<Game/>);

        expect(screen.getByTestId('navigation-menu')).toBeInTheDocument();
        expect(screen.getByTestId('navigation-menu').textContent).toBe(JSON.stringify(dummyState.history));
        expect(navigationMenuSpy).toHaveBeenCalledTimes(1);
        expect(navigationMenuSpy).toHaveBeenNthCalledWith(1,
            {
                history: dummyState.history,
                handleJumpTo: expect.any(Function),
            },
            {}
        );
    });

    test('calls handleClick when a square is clicked', () => {
        render(<Game />);

        // data-testid='board'をクリック
        fireEvent.click(screen.getByTestId('board'));
        // bordSpyでdata-testid='board'に仕込んだイベントのmockHandleClickの発火回数と引数を検証
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
        expect(mockHandleClick).toHaveBeenCalledWith(0);
    });

    test('calls jumpTo when a navigation button is clicked', () => {
        render(<Game />);
        // data-testid='navigation-menu'をクリック
        fireEvent.click(screen.getByTestId('navigation-menu'));
        // bordSpyでdata-testid='navigation-menu'に仕込んだイベントmockHandleJumpToの発火回数と引数を検証
        expect(mockHandleJumpTo).toHaveBeenCalledTimes(1);
        expect(mockHandleJumpTo).toHaveBeenCalledWith(1);
    });
});