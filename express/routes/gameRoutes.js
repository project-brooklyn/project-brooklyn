const express = require("express");
const Game = require("../models/Game");
const User = require("../models/User");

const router = express.Router();

// Save a new game
router.post("/", async (req, res) => {
    try {
        const { userId, data } = req.body;

        if (!userId || !data) {
            return res.status(400).json({ message: "userId and data are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const game = await Game.create({
            user: userId,
            data,
        });

        res.status(201).json(game);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to save game" });
    }
});

// Get all games for a specific user
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const games = await Game.find({ user: userId }).sort({ updatedAt: -1 });

        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve games" });
    }
});


module.exports = router;
