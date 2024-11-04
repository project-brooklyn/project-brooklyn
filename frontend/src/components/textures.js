import { TextureLoader } from "three";

const textures = {
    grass: new TextureLoader().load('/textures/grass.png'),
    dirt: new TextureLoader().load('/textures/dirt.png'),
    stone: new TextureLoader().load('/textures/stone.png'),
}

export default textures;
