import Guy from "../entities/enemies/Guy";
import Mouse from "../entities/enemies/Mouse";
import Rabbit from "../entities/enemies/Rabbit";

const testGameMap = {
    "maxX": 10,
    "maxY": 10,
    "maxZ": 8,
    "towers": [
        ["portal", null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, "rockTower", "rockTower", null, null, null, null],
        [null, null, null, null, "rockTower", "rockTower", null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, "castle"]
    ],
    "tiles": [
        [
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"]
        ],
        [
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"]
        ],
        [
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"],
            ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt"]
        ],
        [
            ["grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass"],
            ["grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass"],
            ["grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass"],
            ["grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass"],
            ["grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass"],
            ["grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass"],
            ["grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass"],
            ["grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass"],
            ["grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass"],
            ["grass", "grass", "grass", "grass", "dirt", "dirt", "grass", "grass", "grass", "grass"]
        ],
        [
            [null, "stone", null, null, null, null, null, null, null, null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, null, null, null, null, null, null, null, "stone", null]
        ],
        [
            [null, "stone", null, null, null, null, null, null, null, null],
            [null, "stone", null, null, null, null, null, null, null, null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, "stone", null, null, null, null, null, null, "stone", null],
            [null, null, null, null, null, null, null, null, "stone", null]
        ],
        [
            [null, "stone", null, null, null, null, null, null, null, null],
            [null, "stone", null, null, null, null, null, null, null, null],
            [null, "stone", null, null, null, null, null, null, null, null],
            [null, "stone", null, null, null, null, null, null, null, null],
            [null, "stone", null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, "stone", null],
            [null, null, null, null, null, null, null, null, "stone", null],
            [null, null, null, null, null, null, null, null, "stone", null],
            [null, null, null, null, null, null, null, null, "stone", null],
            [null, null, null, null, null, null, null, null, "stone", null]
        ],
        [
            [null, "stone", null, null, null, null, null, null, null, null],
            [null, "stone", null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, "stone", null],
            [null, null, null, null, null, null, null, null, "stone", null]
        ]
    ]
}

export const tutorial = [
    {
        enemy: Guy,
        count: 0,
        delay: 25,
        gold: 100,
        gameMap: testGameMap,
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


