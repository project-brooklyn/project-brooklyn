import { TextureLoader } from "three";

const textureLoader = new TextureLoader()

const textures = {
    // Tiles
    bedrock: textureLoader.load('/textures/bedrock.png'),
    dirt: textureLoader.load('/textures/dirt.png'),
    grass: textureLoader.load('/textures/grass.png'),
    stone: textureLoader.load('/textures/stone.png'),
    // Icons
    buffed: textureLoader.load('/icons/buff.png'),
    burned: textureLoader.load('/icons/fire.png'),
    frozen: textureLoader.load('/icons/ice.png'),
    slowed: textureLoader.load('/icons/snail.png'),
}

export default textures;
