/**
 * Établit la connexion à la base de données MongoDB
 * en utilisant Mongoose et l'URL définie dans les variables d'environnement.
 */

const mongoose = require("mongoose");

/**
 * Se connecte à MongoDB à l'aide de l'URL de connexion stockée
 * dans la variable d'environnement URL_MONGO.
 * @returns {void}
 */
function connectToDatabase() {
    mongoose.connect(process.env.URL_MONGO)
        .then(() => {
            console.log("Connexion à MongoDB réussie !");
        })
        .catch((error) => {
            console.error("Erreur de connexion à MongoDB :", error.message);
        });
}

module.exports = connectToDatabase;