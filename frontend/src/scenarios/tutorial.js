import Guy from "../entities/enemies/Guy";
const how_to_dig_1 = "/images/how_to_dig_1.png";
const how_to_dig_2 = "/images/how_to_dig_2.png";
const how_to_fill_1 = "/images/how_to_fill_1.png";
const how_to_fill_2 = "/images/how_to_fill_2.png";
const how_to_sell_1 = "/images/how_to_sell_1.png";

const how_to_dig_map = {
    "maxX": 8,
    "maxY": 8,
    "maxZ": 4,
    "towers": [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 'arrowTower', null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ],
    tiles: [
        [
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
        ],
        [
            [null, null, null, null, null, null, null, null],
            [null, null, null, 'stone', 'stone', 'stone', null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
        [
            [null, null, null, null, null, null, null, null],
            [null, null, null, 'stone', 'stone', 'stone', null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
        [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
    ]
}
const how_to_fill_map = {
    "maxX": 8,
    "maxY": 8,
    "maxZ": 4,
    "towers": [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, 'rockTower', null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ],
    tiles: [
        [
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
        ],
        [
            [null, null, null, null, null, null, null, null],
            ['stone', null, 'stone', 'stone', 'stone', 'stone', 'stone', null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, 'stone', 'stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
            [null, null, null, null, null, null, null, null],
        ],
        [
            [null, null, null, null, null, null, null, null],
            ['stone', null, 'stone', 'stone', 'stone', 'stone', 'stone', null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, 'stone', 'stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
            [null, null, null, null, null, null, null, null],
        ],
        [
            [null, null, null, null, null, null, null, null],
            ['stone', null, 'stone', 'stone', 'stone', 'stone', 'stone', null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, 'stone', 'stone', 'stone', 'stone', 'stone', 'stone', 'stone'],
            [null, null, null, null, null, null, null, null],
        ],
    ]
}
const how_to_sell_map = {
    "maxX": 8,
    "maxY": 8,
    "maxZ": 4,
    "towers": [
        [null, null, null, null, null, null, null, 'laserTower'],
        ['arrowTower', 'arrowTower', 'arrowTower', 'arrowTower', 'arrowTower', 'arrowTower', 'sawTower', null],
        [null, null, null, null, null, null, null, null],
        [null, 'arrowTower', 'arrowTower', 'arrowTower', 'arrowTower', 'arrowTower', 'arrowTower', 'arrowTower',],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ],
    tiles: [
        [
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
            ["bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock", "bedrock"],
        ],
        [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
        [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
        [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
    ]
}

export const tutorial = [
    {
        enemy: Guy,
        count: 1,
        delay: 25,
        goldReward: 0,
        gameMap: how_to_dig_map,
        message: {
            title: "How to Dig",
            text: "In this game, your towers will attack enemies as they move towards your castle along the path indicated by red flags. But they won't attack enemies that are out of range or behind walls. Click the Buy Menu and select the Dig tool to remove some of the walls blocking the path of the enemies.",
            images: [
                how_to_dig_1,
                how_to_dig_2,
            ],
        },
        castleHp: 1,
        gold: 40,
    },
    {
        enemy: Guy,
        count: 6,
        delay: 40,
        goldReward: 0,
        gameMap: how_to_fill_map,
        message: {
            title: "How to Fill",
            text: "Towers and walls will block the path of enemies, which can force them to spend more time in range of your more powerful towers. Click the Buy Menu and select the Fill tool to plug up the hole in your wall. Note that each tower has many different characteristics. This rock tower fires in an arc over walls, and deals splash damage to nearby enemies, but have a higher minimum range.",
            images: [
                how_to_fill_1,
                how_to_fill_2,
            ]
        },
        castleHp: 1,
        gold: 30,
    },
    {
        enemy: Guy,
        count: 50,
        delay: 15,
        goldReward: 0,
        gameMap: how_to_sell_map,
        message: {
            title: "Selling Towers",
            text: "No matter how tall the obstruction, enemies will always be able to climb over to reach the goal. Your towers have a minimum & maximum range, and can also block each other's view. Sell the laser tower and build some other towers in a place where they can target the enemy's path.",
            images: [
                how_to_sell_1,
            ],
        },
        castleHp: 1,
        gold: 1000,
    },
];
