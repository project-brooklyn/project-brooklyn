export const UndoMenu = ({ game }) => {
    const { undoManager } = game;
    return <>
        <div>
            <div>
                {undoManager.hasUndos() && <button onClick={undoManager.undo}>Undo</button>}
            </div>
            <div>
                {undoManager.hasRedos() && <button onClick={undoManager.redo}>Redo</button>}
            </div>
        </div>
    </>
}
