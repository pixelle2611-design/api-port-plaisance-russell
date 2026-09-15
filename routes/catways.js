const express = require("express");
const router = express.Router();
const catwaysService = require("../services/catways");

/**
 * GET /catways
 * Récupère la liste de tous les catways.
 */
/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupère la liste de tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways récupérée avec succès
 *       500:
 *         description: Erreur serveur
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
/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère les détails d'un catway en particulier
 *     tags: [Catways]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Le numéro du catway
 *     responses:
 *       200:
 *         description: Détails du catway récupérés avec succès
 *       404:
 *         description: Catway introuvable
 *       500:
 *         description: Erreur serveur
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
/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Catway"
 *     responses:
 *       201:
 *         description: Catway créé avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
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
/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Modifie uniquement l'état d'un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CatwayState"
 *     responses:
 *       200:
 *         description: État du catway modifié avec succès
 *       404:
 *         description: Catway introuvable
 *       500:
 *         description: Erreur serveur
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
/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Catway supprimé avec succès
 *       404:
 *         description: Catway introuvable
 *       500:
 *         description: Erreur serveur
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