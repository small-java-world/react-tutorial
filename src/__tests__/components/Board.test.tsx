import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Board from '../../components/board';
import * as square from "../../components/square";
import {SquareProps} from "../../components/square";
import {SquareState} from "../../types/game-type";

jest.mock('../../components/Square')

describe('Board Component', () => {
    const onSquareClick = jest.fn();
    const squares: SquareState[] = ["O", "O", "X", "O", "X", "O", "X", "O", "X"];
    let squareSpy: jest.SpyInstance;
    const mockCurrentStatus =  "Next player: X";

    beforeEach(() => {
        squareSpy = jest.spyOn(square, "default")
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the correct number of squares', () => {
        render(<Board squares={squares} currentStatus={mockCurrentStatus} handleClick={onSquareClick}/>);
        expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();

        expect(squareSpy).toHaveBeenCalledTimes(9);
        squares.forEach((value, index) => {
            expect(squareSpy).toHaveBeenNthCalledWith(index + 1,
                {
                    value,
                    "onSquareClick": expect.any(Function),
                },
                {}
            )
        });
    });

    it('renders the correct number of squares2', () => {
        squareSpy.mockImplementation((props: SquareProps) => {
            return (
                <button className='square' onClick={props.onSquareClick}>
                    {props.value}
                </button>
            )
        });
        render(<Board squares={squares} currentStatus={mockCurrentStatus} handleClick={onSquareClick}/>);
        const firstSquareButton = screen.getAllByRole('button')[0];
        fireEvent.click(firstSquareButton);
        expect(onSquareClick).toHaveBeenCalledTimes(1);
    });


});