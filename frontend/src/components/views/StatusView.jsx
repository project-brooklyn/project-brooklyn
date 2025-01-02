import * as THREE from 'three'
import { statusIcons } from '../../utils/render_utils'

export const StatusView = ({ statuses, position, height }) => {
    return <>
        {statuses.map((status, i) => <sprite
            scale={[0.1, 0.1, 0.1]}
            position={[position[0], (position[1] + height)/4, position[2]]}
            key={i}
        >
            <spriteMaterial 
                attach="material" 
                map={new THREE.TextureLoader().load(statusIcons[status])}
            />
         </sprite>)}
    </>
    
}
