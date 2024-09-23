import React from 'react';
import { render, screen } from '@testing-library/react';
import NavigationMenu, {NavigationMenuProp} from '../navigation-menu';
import { Step } from '../../types/game-type';
import userEvent from '@testing-library/user-event';
import * as navigationMenuItem from "../navigation-menu-item";
import {NavigationMenuItemProps} from "../navigation-menu-item";


jest.mock('../navigation-menu-item');

describe('NavigationMenu Component', () => {
    const jumpToMock = jest.fn();
    let navigationMenuItemSpy: jest.SpyInstance;

    beforeEach(() => {
        navigationMenuItemSpy = jest.spyOn(navigationMenuItem, "default");

        navigationMenuItemSpy.mockImplementation((props: NavigationMenuItemProps) => (
            <div data-testid={`navigation-menu-item-${props.move}`} onClick={() => props.handleJumpTo(props.move)} />
        ));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const generateHistory = (length: number) =>
        Array(length).fill(0).map(() => ({squares: []}));

    test('does not render any buttons when history is empty', () => {
        render(<NavigationMenu history={[]} handleJumpTo={jumpToMock} />);
        screen.debug();
        expect(screen.queryByRole('button', {  name: /go to game start/i})).not.toBeInTheDocument();
        Array(8).fill(0).forEach((_, index) =>
            expect(screen.queryByRole('button', {  name: `Go to move #${index+1}`})).not.toBeInTheDocument());
    });

    test('renders only the "Go to game start" button when history has one item', () => {
        const history: Step[] = generateHistory(1)
        render(<NavigationMenu history={history} handleJumpTo={jumpToMock} />);
        expect(screen.getByTestId('navigation-menu-item-0')).toBeInTheDocument();
        expect(screen.queryByTestId('navigation-menu-item-1')).not.toBeInTheDocument();
    });

    test('renders all move buttons when history has nine items', () => {
        const history: Step[] = generateHistory(9)
        render(<NavigationMenu history={history} handleJumpTo={jumpToMock} />);

        Array(8).fill(0).forEach((_, index) =>
            expect(screen.getByTestId(`navigation-menu-item-${index+1}`)).toBeInTheDocument())

        expect(screen.queryByTestId('navigation-menu-item-9')).not.toBeInTheDocument();
    });

});