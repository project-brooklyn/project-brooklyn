import Guy from "../entities/enemies/Guy";
import Mouse from "../entities/enemies/Mouse";
import Rabbit from "../entities/enemies/Rabbit";

export const tutorial = [
    {
        enemy: Guy,
        count: 0,
        delay: 25,
        gold: 100,
    },
    {
        enemy: Mouse,
        count: 30,
        delay: 20,
        gold: 100,
    },
    {
        enemy: Rabbit,
        count: 30,
        delay: 20,
        gold: 100,
    },
];
