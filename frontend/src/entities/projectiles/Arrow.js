import * as THREE from 'three';
import Projectile from "./Projectile";
import { convertToRenderCoordinates } from "../../utils/render_utils";

export default class Arrow extends Projectile {
    constructor (x, y, z, path) {
        // Determine rotation based on the start and end of path.
        // We assume that models have a default orientation facing
        // forward along the positive y-axis. See GDD for more details.
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

        super(x, y, z, quaternion, path);
        this.name = "arrow";
    }
}
