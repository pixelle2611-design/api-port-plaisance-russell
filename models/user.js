/**
 * Modèle user  du port de Russell.
 */

const mongoose = require("mongoose");

/**
 * Schéma définissant la structure d'un user en base de données.
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, match: [/.+@.+\..+/, "Veuillez entrer un email valide"],
    },
    password: {
        type: String,
        required: true, minlength: 6,
    },
}); 
     
module.exports = mongoose.model("User", userSchema);