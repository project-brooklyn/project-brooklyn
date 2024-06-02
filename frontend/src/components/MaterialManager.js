import * as THREE from "three";
import { TileType } from "../map/Tile";

class MaterialManager {
    materials = new Map();

    constructor() {
        // Load tile materials
        for (const type in TileType)
        {
            const tileType = TileType[type]
            this.materials.set(tileType.name, this.makeTileMaterial(tileType))
        }
    }

    makeTileMaterial(tileType) {
        return new THREE.MeshBasicMaterial({
            color: tileType.material.color
        });
    }

    get(name) {
        return this.materials.get(name)
    }
}

export default MaterialManager;
