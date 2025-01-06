import * as THREE from 'three';
import Projectile from "./Projectile";
import { convertToRenderCoordinates } from '../../utils/render_utils';

export default class Flame extends Projectile {
    constructor (x, y, z, path, scale=0.01) {
        const quaternion = new THREE.Quaternion();
        if (path && path.length >= 2) {
            const start = new THREE.Vector3().fromArray(path.at(0));
            const end = new THREE.Vector3().fromArray(path.at(-1));
            const trajectory = new THREE.Vector3().subVectors(end, start);

            const yAxis = new THREE.Vector3(0, 1, 0);

            // TODO(#30): Convert from game to render quaternion in `ProjectileView`
            const renderY = convertToRenderCoordinates(yAxis);
            const renderV = convertToRenderCoordinates(trajectory).normalize();
            quaternion.setFromUnitVectors(renderY, renderV);
        }
        super(x, y, z, scale, quaternion, path);
        this.name = "flame";
    }
}
