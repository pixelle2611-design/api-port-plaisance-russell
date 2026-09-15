const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const usersService = require("../services/users");

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authentifie un utilisateur et renvoie un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentification réussie, token renvoyé
 *       401:
 *         description: Email ou mot de passe incorrect
 *       500:
 *         description: Erreur serveur
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersService.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const motDePasseValide = await usersService.estCorrect(password, user.password);

        if (!motDePasseValide) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Déconnecte l'utilisateur
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.get("/logout", (req, res) => {
    res.status(200).json({ message: "Déconnexion réussie" });
});

module.exports = router;