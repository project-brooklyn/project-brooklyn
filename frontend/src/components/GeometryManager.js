import * as THREE from "three";
import { tileConfig } from "../utils/render_utils";

class GeometryManager {
    geometries = new Map();

    constructor() {
        const spacer = 0.05; // add space between tiles to see better, remove after improved textures
        this.geometries.set("tile", new THREE.BoxGeometry(
            tileConfig.width * (1 - spacer),
            tileConfig.height * (1 - spacer),
            tileConfig.width * (1 - spacer),
        ));
    }

    get(name) {
        return this.geometries.get(name)
    }
}

export default GeometryManager;
