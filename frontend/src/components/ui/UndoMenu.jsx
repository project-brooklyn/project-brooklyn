export const UndoMenu = ({ game }) => {
    const { undoManager } = game;
    return <>
        <div className="d-flex">
            <div className="d-flex w-50 justify-content-center">
                {undoManager.hasUndos() && <button onClick={undoManager.undo}>Undo</button>}
            </div>
            <div className="d-flex w-50 justify-content-center">
                {undoManager.hasRedos() && <button onClick={undoManager.redo}>Redo</button>}
            </div>
        </div>
    </>
}
