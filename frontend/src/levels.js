import Guy from "./entities/enemies/Guy";
import Lamb from "./entities/enemies/Lamb";
import Cow from "./entities/enemies/Cow";

export const levels = [
    {
        enemy: Guy,
        count: 0,
        delay: 25,
        gold: 100,
    },
    {
        enemy: Cow,
        count: 1,
        delay: 25,
        gold: 100,
    },
    {
        enemy: Lamb,
        count: 10,
        delay: 25,
        gold: 100,
    },
    {
        enemy: Guy,
        count: 20,
        delay: 25,
        gold: 100,
    },
    {
        enemy: Guy,
        count: 30,
        delay: 25,
        gold: 100,
    },
    {
        enemy: Guy,
        count: 40,
        delay: 25,
        gold: 100,
    },
    {
        enemy: Guy,
        count: 50,
        delay: 25,
        gold: 100,
    },
];
