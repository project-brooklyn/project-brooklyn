import { TextureLoader } from "three";

const textures = {
    grass: new TextureLoader().load('/textures/grass.png'),
    dirt: new TextureLoader().load('/textures/dirt.png'),
    stone: new TextureLoader().load('/textures/stone.png'),
    bedrock: new TextureLoader().load('/textures/bedrock.png'),
}

export default textures;
