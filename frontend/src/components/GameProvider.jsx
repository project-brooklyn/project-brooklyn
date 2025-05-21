import { GameContext } from "./GameContext"

export const GameProvider = ({ children, game }) => {
    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>
    )
}
