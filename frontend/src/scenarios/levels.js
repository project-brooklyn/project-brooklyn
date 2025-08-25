import Alligator from "../entities/enemies/Alligator";
import Cockroach from "../entities/enemies/Cockroach";
import Cow from "../entities/enemies/Cow";
import Guy from "../entities/enemies/Guy";
import Lamb from "../entities/enemies/Lamb";
import Mouse from "../entities/enemies/Mouse";
import Rabbit from "../entities/enemies/Rabbit";

export const defaultLevels = [
    {
        enemy: Guy,
        count: 0,
        delay: 25,
        goldReward: 100,
    },
    {
        enemy: Cow,
        count: 1,
        delay: 200,
        goldReward: 100,
    },
    {
        enemy: Lamb,
        count: 10,
        delay: 12,
        goldReward: 100,
    },
    {
        enemy: Alligator,
        count: 5,
        delay: 125,
        goldReward: 100,
    },
    {
        enemy: Mouse,
        count: 30,
        delay: 20,
        goldReward: 100,
    },
    {
        enemy: Rabbit,
        count: 30,
        delay: 20,
        goldReward: 100,
    },
    {
        enemy: Cockroach,
        count: 50,
        delay: 20,
        goldReward: 100,
    },
    {
        enemy: Lamb,
        count: 200,
        delay: 5,
        goldReward: 100,
    },
    {
        enemy: Guy,
        count: 50,
        delay: 20,
        goldReward: 100,
    },
    {
        enemy: Guy,
        count: 50,
        delay: 15,
        goldReward: 100,
    },
    {
        enemy: Guy,
        count: 75,
        delay: 10,
        goldReward: 100,
    },
];
