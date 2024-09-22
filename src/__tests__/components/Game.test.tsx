import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../../components/game';
import {NavigationMenuProp} from "../../components/navigation-menu";
import {BoardProps} from "../../components/board";
import * as board from "../../components/board";
import * as navigationMenu from "../../components/navigation-menu";
import {useGameState} from "../../hooks/use-game-state";

jest.mock('../../hooks/use-game-state');
jest.mock('../../components/board');
jest.mock('../../components/navigation-menu');


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