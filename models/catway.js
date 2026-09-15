/**
 * Modèle Mongoose représentant un catway (appontement) du port de Russell.
 */

const mongoose = require("mongoose");

/**
 * Schéma définissant la structure d'un catway en base de données.
 */
const catwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    catwayType: {
        type: String,
        required: true,
        enum: ["long", "short"],
    },
    catwayState: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Catway", catwaySchema);