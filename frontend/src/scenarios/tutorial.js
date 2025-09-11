import Guy from "../entities/enemies/Guy";
import Mouse from "../entities/enemies/Mouse";
import Rabbit from "../entities/enemies/Rabbit";
const tutorial1 = "/images/tutorial1.png";
const tutorial2 = "/images/tutorial2.png";

const emptyGameMap = {
    "maxX": 6,
    "maxY": 6,
    "maxZ": 2,
    "towers": [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
    ],
    tiles: [
        [
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
        ],
        [
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
        ]
    ]
}
const testGameMap = {
    "maxX": 10,
    "maxY": 10,
    "maxZ": 8,
    "towers": [
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, "rockTower", "rockTower", null, null, null, null],
        [null, null, null, null, "rockTower", "rockTower", null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
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
        ],
    ]
}

const testGameMap2 = {
    "maxX": 10,
    "maxY": 10,
    "maxZ": 8,
    "towers": [
        ["portal", null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, "laserTower", null, null, null, null, "laserTower", null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, "laserTower", null, null, null, null, "laserTower", null, null],
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
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null]
        ],
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null]
        ],
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null]
        ],
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null]
        ],
    ]
}

export const tutorial = [
    {
        enemy: Guy,
        count: 4,
        delay: 25,
        goldReward: 0,
        gameMap: emptyGameMap,
        message: {
            title: "Welcome to the Tutorial",
            text: "This is how messages will be displayed.",
            images: [
                tutorial1,
                tutorial2,
            ],
        },
        castleHp: 1,
        gold: 0,
    },
    {
        enemy: Mouse,
        count: 30,
        delay: 20,
        goldReward: 0,
        gameMap: testGameMap2,
        message: {
            title: "Building Towers",
            text: "You can build towers to defend your castle."
        },
        gold: 1000,
    },
    {
        enemy: Rabbit,
        count: 30,
        delay: 20,
        goldReward: 0,
    },
];
