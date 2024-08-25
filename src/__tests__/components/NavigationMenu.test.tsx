import React from 'react';
import {render, screen} from '@testing-library/react';;
import NavigationMenu from "../../components/NavigationMenu";
import {Step} from "../../types/gameType";

jest.mock('../../components/Square')

describe('NavigationMenu Component', () => {
    const jumpTo = jest.fn();

    beforeEach(() => {
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the correct number of squares', () => {
        const history : Step[] = [];
        render(<NavigationMenu history={history} onJumpTo={jumpTo} />);
        expect(screen.queryByRole('button', {  name: /go to game start/i})).not.toBeInTheDocument();
        [...Array(8).keys()].map((index) => {
            expect(screen.queryByRole('button', {  name: `Go to move #${index+1}`})).not.toBeInTheDocument();
        });
    });


    it('renders the correct number of squares2', () => {
        const history: Step[] = generateHIstory(1)
        render(<NavigationMenu history={history} onJumpTo={jumpTo} />);
        expect(screen.getByRole('button', {  name: /go to game start/i})).toBeInTheDocument();
        [...Array(8).keys()].map((index) => {
            expect(screen.queryByRole('button', {  name: `Go to move #${index+1}`})).not.toBeInTheDocument();
        })
    });

    it('renders the correct number of squares4', () => {
        const history: Step[] = generateHIstory(2)
        render(<NavigationMenu history={history} onJumpTo={jumpTo} />);
        expect(screen.getByRole('button', {  name: /go to game start/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {  name: `Go to move #1`})).toBeInTheDocument();

    });


    it('renders the correct number of squares3', () => {
        const history: Step[] = generateHIstory(9)
        render(<NavigationMenu history={history} onJumpTo={jumpTo} />);

        expect(screen.getByRole('button', {  name: /go to game start/i})).toBeInTheDocument();
        Array(8).fill(0).map((_, index) => {
            console.log(`index: ${index}`);
            expect(screen.getByRole('button', {  name: `Go to move #${index+1}`})).toBeInTheDocument();
        })
    });

    const generateHIstory = (length: number) =>
        Array(length).fill(0).map((_) => { return  {squares: []} })

});