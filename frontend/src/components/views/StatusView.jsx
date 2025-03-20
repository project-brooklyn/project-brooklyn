import * as THREE from 'three'
import textures from '../textures'

const STATUS_SPACING = 0.1;

export const StatusView = ({ statuses = {}, position, height }) => {
    const statusCount = Object.values(statuses).filter(Boolean).length;
    return <>
        {Object.entries(statuses).map(([status, hasStatus], i) => {
            if (!hasStatus) return null;
            const offset = (i * STATUS_SPACING) - (statusCount * STATUS_SPACING) / 2;
            return <sprite
                scale={[0.1, 0.1, 0.1]}
                position={[position[0] + offset, (position[1] + height) / 4, position[2]]}
                key={i}
            >
                <spriteMaterial
                    attach="material"
                    map={textures[status]}
                />
            </sprite>
        })}
    </>
}
