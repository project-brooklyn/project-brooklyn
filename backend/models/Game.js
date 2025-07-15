const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    data: {
        type: String,
        required: true,
    }
})

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
