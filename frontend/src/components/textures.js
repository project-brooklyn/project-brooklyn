import { TextureLoader } from "three";

const textureLoader = new TextureLoader()

const textures = {
    grass: textureLoader.load('/textures/grass.png'),
    dirt: textureLoader.load('/textures/dirt.png'),
    stone: textureLoader.load('/textures/stone.png'),
    bedrock: textureLoader.load('/textures/bedrock.png'),
    // TODO: Convert to lowercase
    BUFFED: textureLoader.load('/icons/buff.png'),
    BURNED: textureLoader.load('/icons/fire.png'),
    FROZEN: textureLoader.load('/icons/ice.png'),
    SLOWED: textureLoader.load('/icons/snail.png'),
}

export default textures;
