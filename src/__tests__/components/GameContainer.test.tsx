import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import GameContainer from '../../components/GameContainer';
import { useGameState } from '../../hooks/useGameState';
import * as game from '../../components/Game';

import {GameProps} from "../../components/Game";

jest.mock('../../components/Game')
jest.mock('../../hooks/useGameState');

describe('GameContainer Component', () => {
    let gameSpy: jest.SpyInstance;

    const mockState = {
        history: [{ squares: Array(9).fill(null) }],
        currentMove: 0
    };
    const mockCurrentState =  "Next player: X";

    const mockUseGameState = useGameState as jest.MockedFunction<typeof useGameState>;
    const mockHandleClick = jest.fn();
    const mockHandleJumpTo = jest.fn();



    beforeEach(() => {
        gameSpy = jest.spyOn(game, "default");

        gameSpy.mockImplementation((props: GameProps) => (
            <div data-testid="game">
                <div data-testid="state-area"> {props.state.toString()}</div>
                <div data-testid="current-state-area"> {props.currentState}</div>
                <div data-testid="board" onClick={() => props.handleClick(0)}/>
                <div data-testid="navigation-menu" onClick={() => props.handleJumpTo(1)}/>
            </div>
        ));

        mockUseGameState.mockReturnValue({
            state: mockState,
            currentState: mockCurrentState,
            handleClick: mockHandleClick,
            handleJumpTo: mockHandleJumpTo
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Game component with correct props', () => {
        render(<GameContainer />);

        expect(screen.getByTestId('game')).toBeInTheDocument();
        expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
    });

    test('calls handleClick when a square is clicked', () => {
        render(<GameContainer/>);

        const handleClickArea = screen.getByTestId('board');
        fireEvent.click(handleClickArea);

        expect(mockHandleClick).toHaveBeenCalledTimes(1);
        expect(mockHandleClick).toHaveBeenCalledWith(0);
    });

    test('calls handleJumpTo when a navigation button is clicked', () => {
        render(<GameContainer/>);

        const handleClickArea = screen.getByTestId('navigation-menu');
        fireEvent.click(handleClickArea);

        expect(mockHandleJumpTo).toHaveBeenCalledTimes(1);
        expect(mockHandleJumpTo).toHaveBeenCalledWith(1);
    });
});