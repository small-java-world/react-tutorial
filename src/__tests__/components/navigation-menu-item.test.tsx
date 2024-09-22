import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationMenuItem from '../../components/navigation-menu-item';

describe('NavigationMenuItem Component', () => {
    const handleJumpToMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders "Go to game start" button when move is 0', () => {
        render(<NavigationMenuItem move={0} handleJumpTo={handleJumpToMock} />);
        expect(screen.getByRole('button', { name: /go to game start/i })).toBeInTheDocument();
    });

    test('renders "Go to move #1" button when move is 1', () => {
        render(<NavigationMenuItem move={1} handleJumpTo={handleJumpToMock} />);
        expect(screen.getByRole('button', { name: /go to move #1/i })).toBeInTheDocument();
    });

    test('calls handleJumpTo with correct move number when button is clicked', () => {
        render(<NavigationMenuItem move={1} handleJumpTo={handleJumpToMock} />);
        userEvent.click(screen.getByRole('button', { name: /go to move #1/i }));
        expect(handleJumpToMock).toHaveBeenCalledTimes(1);
        expect(handleJumpToMock).toHaveBeenCalledWith(1);
    });
});