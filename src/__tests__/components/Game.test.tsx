import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../../components/Game';
import { GameState } from '../../types/gameType';
import {NavigationMenuProp} from "../../components/NavigationMenu";
import {BoardProps} from "../../components/Board";
import * as board from "../../components/Board";
import * as navigationMenu from "../../components/NavigationMenu";
import {useGameState} from "../../hooks/useGameState";

jest.mock('../../hooks/useGameState');
jest.mock('../../components/Board');
jest.mock('../../components/NavigationMenu');


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

    const generateGameState = (historyLength: number): GameState => ({
        history: Array(historyLength).fill({ squares: Array(9).fill(null) }),
        currentMove: historyLength - 1
    });

    test('renders game status correctly', () => {
        render(<Game />);
    });

    test('renders Board component with correct props', () => {
        render(<Game />);
        expect(screen.getByTestId('board')).toBeInTheDocument();
        expect(screen.getByTestId('board-current-status').textContent).toBe(mockCurrentStatus);
        expect(screen.getByTestId('board-current-square').textContent).toBe(JSON.stringify(dummyState.history[dummyState.currentMove].squares));
    });

    test('renders NavigationMenu component with correct props', () => {
        render(<Game/>);
        expect(screen.getByTestId('navigation-menu')).toBeInTheDocument();
        expect(screen.getByTestId('navigation-menu').textContent).toBe(JSON.stringify(dummyState.history));
    });

    test('calls handleClick when a square is clicked', () => {
        render(<Game />);
        fireEvent.click(screen.getByTestId('board'));
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
        expect(mockHandleClick).toHaveBeenCalledWith(0);
    });

    test('calls jumpTo when a navigation button is clicked', () => {
        render(<Game />);
        fireEvent.click(screen.getByTestId('navigation-menu'));
        expect(mockHandleJumpTo).toHaveBeenCalledTimes(1);
        expect(mockHandleJumpTo).toHaveBeenCalledWith(1);
    });
});