/**
 * Point d'entrée de l'application Express.
 * Initialise le serveur et le fait écouter sur le port défini.
 */

require("dotenv").config();

const express = require("express");
const connectToDatabase = require("./db/mongo");
const catwaysRoutes = require("./routes/catways");
const reservationsRoutes = require("./routes/reservations");
const usersRoutes = require("./routes/users");

const app = express();
const port = 8000;
const authRoutes = require("./routes/auth");
const verifierToken = require("./middlewares/auth");
connectToDatabase();

/**
 * Middleware permettant à Express de comprendre le JSON envoyé
 * dans le corps des requêtes (obligatoire pour POST et PUT).
 */
app.use(express.json());
app.use(express.static("public"));

/**
 * Route de test — répond avec un simple message texte
 * pour vérifier que le serveur fonctionne correctement.
 */
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/index.html");
});

/**
 * Branche toutes les routes catways sur le préfixe /catways.
 */
app.use("/catways", verifierToken, catwaysRoutes);
app.use("/catways", verifierToken, reservationsRoutes);
app.use("/users", verifierToken, usersRoutes);
app.use("/", authRoutes);
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

