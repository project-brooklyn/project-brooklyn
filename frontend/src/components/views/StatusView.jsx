const STATUS_SPACING = 0.1;

export const StatusView = ({ assets, statuses, position, height }) => {
    const offset = (statuses.size * STATUS_SPACING) / 2;

    let index = 0
    let dx = -offset

    const statusSprites = []
    statuses.forEach((status) => {
        statusSprites.push(
            <sprite
                scale={[0.1, 0.1, 0.1]}
                position={[position[0] + dx, (position[1] + height) / 4, position[2]]}
                material={assets.materialManager.get(status)}
                key={index}
            />
        )
        index += 1
        dx += STATUS_SPACING
    })

    return <>
        {statusSprites}
    </>
}
