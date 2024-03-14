import { renderTile } from "../utils/render_utils"

export default function MapView({gameMap})
{
    const tilesMeshes = gameMap.mapData.map(renderTile)

    return <>
        {tilesMeshes}
    </>
}
