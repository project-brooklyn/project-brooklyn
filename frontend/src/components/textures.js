import { TextureLoader } from "three";

const textureLoader = new TextureLoader()

const textures = {
    grass: textureLoader.load('/textures/grass.png'),
    dirt: textureLoader.load('/textures/dirt.png'),
    stone: textureLoader.load('/textures/stone.png'),
    bedrock: textureLoader.load('/textures/bedrock.png'),
}

export default textures;
