import React from 'react';
import { render, screen } from '@testing-library/react';
import NavigationMenu from '../../components/NavigationMenu';
import { Step } from '../../types/gameType';
import userEvent from '@testing-library/user-event';

describe('NavigationMenu Component', () => {
    const jumpToMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    const generateHistory = (length: number) =>
        Array(length).fill(0).map(() => ({squares: []}));

    test('does not render any buttons when history is empty', () => {
        render(<NavigationMenu history={[]} handleJumpTo={jumpToMock} />);
        expect(screen.queryByRole('button', {  name: /go to game start/i})).not.toBeInTheDocument();
        Array(8).fill(0).forEach((_, index) =>
            expect(screen.queryByRole('button', {  name: `Go to move #${index+1}`})).not.toBeInTheDocument());
    });

    test('renders only the "Go to game start" button when history has one ste', () => {
        const history: Step[] = generateHistory(1)
        render(<NavigationMenu history={history} handleJumpTo={jumpToMock} />);
        expect(screen.getByRole('button', {  name: /go to game start/i})).toBeInTheDocument();
        Array(8).fill(0).forEach((_, index) =>
            expect(screen.queryByRole('button', {  name: `Go to move #${index+1}`})).not.toBeInTheDocument())
    });

    test('renders "Go to game start" and "Go to move #1" buttons when history has two steps', () => {
        const history: Step[] = generateHistory(2)
        render(<NavigationMenu history={history} handleJumpTo={jumpToMock} />);
        expect(screen.getByRole('button', {  name: /go to game start/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {  name: `Go to move #1`})).toBeInTheDocument();
    });

    test('renders all move buttons when history has nine step', () => {
        const history: Step[] = generateHistory(9)
        render(<NavigationMenu history={history} handleJumpTo={jumpToMock} />);

        expect(screen.getByRole('button', {  name: /go to game start/i})).toBeInTheDocument();
        Array(8).fill(0).forEach((_, index) =>
            expect(screen.getByRole('button', {  name: `Go to move #${index+1}`})).toBeInTheDocument())
    });

    test('calls onJumpTo with 0 when "Go to game start" button is clicked', () => {
        const history: Step[] = generateHistory(2)
        render(<NavigationMenu history={history} handleJumpTo={jumpToMock} />);
        userEvent.click(screen.getByRole('button', {  name: /go to game start/i}));
        expect(jumpToMock).toHaveBeenCalledTimes(1);
        expect(jumpToMock).toHaveBeenCalledWith(0);
    });

    test('calls onJumpTo with the correct move number when a move button is clicked', () => {
        const history: Step[] = generateHistory(3)
        render(<NavigationMenu history={history} handleJumpTo={jumpToMock} />);
        userEvent.click(screen.getByRole('button', {  name: /Go to move #1/i}));


        expect(jumpToMock).toHaveBeenCalledTimes(1);
        expect(jumpToMock).toHaveBeenNthCalledWith(1, 1);

        userEvent.click(screen.getByRole('button', {  name: /Go to move #2/i}));
        expect(jumpToMock).toHaveBeenCalledTimes(2);
        expect(jumpToMock).toHaveBeenNthCalledWith(2, 2);
    });

});