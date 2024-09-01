import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../../components/Game';
import { GameState } from '../../types/gameType';
import { getCurrentSquare } from '../../utils/GameStateUtil';
import {NavigationMenuProp} from "../../components/NavigationMenu";
import {BoardProps} from "../../components/Board";
import * as board from "../../components/Board";
import * as navigationMenu from "../../components/NavigationMenu";

jest.mock('../../components/Board');
jest.mock('../../components/NavigationMenu');

describe('Game Component', () => {
    let bordSpy: jest.SpyInstance;
    let navigationMenuSpy: jest.SpyInstance;
    const handleClickMock = jest.fn();
    const jumpToMock = jest.fn();

    beforeEach(() => {
        bordSpy = jest.spyOn(board, "default");
        navigationMenuSpy = jest.spyOn(navigationMenu, "default");

        bordSpy.mockImplementation((props: BoardProps) => (
            <div data-testid="board" onClick={() => props.handleClick(0)}>{props.squares.length}</div>
        ));
        navigationMenuSpy.mockImplementation((props: NavigationMenuProp) => (
            <div data-testid="navigation-menu" onClick={() => props.handleJumpTo(0)}>{props.history.length}</div>
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
        const state = generateGameState(1);
        render(<Game state={state} currentState="Next player: X" handleClick={handleClickMock} handleJumpTo={jumpToMock} />);
        expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
    });

    test('renders Board component with correct props', () => {
        const state = generateGameState(1);
        render(<Game state={state} currentState="Next player: X" handleClick={handleClickMock} handleJumpTo={jumpToMock} />);
        expect(screen.getByTestId('board')).toBeInTheDocument();
        expect(screen.getByTestId('board').textContent).toBe(getCurrentSquare(state).length.toString());
    });

    test('renders NavigationMenu component with correct props', () => {
        const state = generateGameState(2);
        render(<Game state={state} currentState="Next player: X" handleClick={handleClickMock} handleJumpTo={jumpToMock} />);
        expect(screen.getByTestId('navigation-menu')).toBeInTheDocument();
        expect(screen.getByTestId('navigation-menu').textContent).toBe(state.history.length.toString());
    });

    test('calls handleClick when a square is clicked', () => {
        const state = generateGameState(1);
        render(<Game state={state} currentState="Next player: X" handleClick={handleClickMock} handleJumpTo={jumpToMock} />);
        fireEvent.click(screen.getByTestId('board'));
        expect(handleClickMock).toHaveBeenCalledTimes(1);
        expect(handleClickMock).toHaveBeenCalledWith(0);
    });

    test('calls jumpTo when a navigation button is clicked', () => {
        const state = generateGameState(2);
        render(<Game state={state} currentState="Next player: X" handleClick={handleClickMock} handleJumpTo={jumpToMock} />);
        fireEvent.click(screen.getByTestId('navigation-menu'));
        expect(jumpToMock).toHaveBeenCalledTimes(1);
        expect(jumpToMock).toHaveBeenCalledWith(0);
    });
});