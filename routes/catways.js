const express = require("express");
const router = express.Router();
const catwaysService = require("../services/catways");

/**
 * GET /catways
 * Récupère la liste de tous les catways.
 */
router.get("/", async (req, res) => {
    try {
        const catways = await catwaysService.getAllCatways();
        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * GET /catways/:id
 * Récupère les détails d'un catway en particulier.
 * id représente le numéro de catway.
 */
router.get("/:id", async (req, res) => {
    try {
        const catway = await catwaysService.getCatwayByNumber(req.params.id);
        if (!catway) {
            return res.status(404).json({ message: "Catway introuvable" });
        }
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * POST /catways
 * Crée un nouveau catway.
 */
router.post("/", async (req, res) => {
    try {
        const catway = await catwaysService.createCatway(req.body);
        res.status(201).json(catway);
    } catch (error) {
        res.status(400).json({ message: "Impossible de créer le catway", error: error.message });
    }
});

/**
 * PUT /catways/:id
 * Modifie uniquement l'état d'un catway (le numéro et le type ne sont pas modifiables).
 */
router.put("/:id", async (req, res) => {
    try {
        const catway = await catwaysService.updateCatwayState(req.params.id, req.body.catwayState);
        if (!catway) {
            return res.status(404).json({ message: "Catway introuvable" });
        }
        res.status(200).json(catway);
    } catch (error) {
        res.status(400).json({ message: "Impossible de modifier le catway", error: error.message });
    }
});

/**
 * DELETE /catways/:id
 * Supprime un catway.
 */
router.delete("/:id", async (req, res) => {
    try {
        const catwaySupprime = await catwaysService.deleteCatway(req.params.id);
        if (!catwaySupprime) {
            return res.status(404).json({ message: "Catway introuvable" });
        }
        res.status(200).json({ message: "Catway supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur", error: error.message });
            }
});

module.exports = router;