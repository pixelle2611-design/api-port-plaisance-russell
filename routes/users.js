const express = require("express");
const router = express.Router();
const usersService = require("../services/users");

/**
 * GET /users/
 * Récupère la liste de tous les utilisateurs.
 */
router.get("/", async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * GET /users/:email
 * Récupère les détails d'un utilisateur en particulier.
 */
router.get("/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * POST /users/
 * Crée un nouvel utilisateur.
 */
router.post("/", async (req, res) => {
    try {
        const user = await usersService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * PUT /users/:email
 * Modifie les détails d'un utilisateur.
 */
router.put("/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await usersService.updateUser(email, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * DELETE /users/:email
 * Supprime un utilisateur.
 */
router.delete("/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await usersService.deleteUser(email);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;