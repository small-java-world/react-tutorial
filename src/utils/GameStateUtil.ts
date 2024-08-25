import {GameState} from "../types/gameType";

export const getCurrentSquare = (state: GameState) => state.history[state.currentMove].squares