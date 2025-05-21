import { createContext, useContext } from 'react';

export const GameContext = createContext(undefined);

export function useGameContext() {
    const game = useContext(GameContext);

    if (game === undefined) {
        throw new Error("useGameContext() must be used within a GameContext.")
    }

    return game;
}
