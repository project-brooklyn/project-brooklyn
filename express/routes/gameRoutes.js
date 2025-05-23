const express = require("express");
const Game = require("../models/Game");
const User = require("../models/User");

const router = express.Router();

// Save a new game
router.post("/", async (req, res) => {
    try {
        const { userId, data, createdAt } = req.body;

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
            createdAt,
        });

        res.status(201).json(game);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to save game" });
    }
});

// Delete a game based on userId and createdAt
router.delete("/", async (req, res) => {
    try {
        const { userId, createdAt } = req.body;
        if (!userId || !createdAt) {
            return res.status(400).json({ message: "userId and createdAt are required" });
        }
        const game = await Game.findOneAndDelete({
            user: userId,
            createdAt,
        });
        if (!game) {
            return res.status(204).json({ message: "No saved game to delete" });
        }
        res.status(200).json({ message: "Game deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete games" });
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
