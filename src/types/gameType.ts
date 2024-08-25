export type SquareState = 'O' | 'X' | null

export type Step = {
    readonly squares: SquareState[]
}

export type GameState = {
    readonly history: Step[]
    readonly currentMove: number
}
