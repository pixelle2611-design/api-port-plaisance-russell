const express = require("express");
const router = express.Router();
const reservationsService = require("../services/reservations");

/**
 * GET /catways/:id/reservations
 * Récupère la liste des réservations d'un catway.
 */
/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Récupère la liste des réservations d'un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Liste des réservations récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id/reservations", async (req, res) => {
    try {
        const reservations = await reservationsService.getReservationsByCatway(req.params.id);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * GET /catways/:id/reservations/:idReservation
 * Récupère les détails d'une réservation en particulier.
 */
/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Récupère les détails d'une réservation en particulier
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du catway
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la réservation
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *       404:
 *         description: Réservation introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id/reservations/:idReservation", async (req, res) => {
    try {
        const reservation = await reservationsService.getReservationById(req.params.idReservation);
        if (!reservation) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

/**
 * POST /catways/:id/reservations
 * Crée une nouvelle réservation pour un catway.
 */
/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     summary: Crée une nouvelle réservation pour un catway
 *     tags: [Reservations]
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
 *             $ref: "#/components/schemas/Reservation"
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/:id/reservations", async (req, res) => {
    try {
        const data = { ...req.body, catwayNumber: req.params.id };
        const reservation = await reservationsService.createReservation(data);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: "Impossible de créer la réservation", error: error.message });
    }
});

/**
 * PUT /catways/:id/reservations/:idReservation
 * Modifie une réservation existante.
 */
/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   put:
 *     summary: Modifie une réservation existante
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du catway
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la réservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Reservation"
 *     responses:
 *       200:
 *         description: Réservation modifiée avec succès
 *       404:
 *         description: Réservation introuvable
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id/reservations/:idReservation", async (req, res) => {
    try {
        const reservationModifiee = await reservationsService.updateReservation(req.params.idReservation, req.body);
        if (!reservationModifiee) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }
        res.status(200).json(reservationModifiee);
    } catch (error) {
        res.status(400).json({ message: "Impossible de modifier la réservation", error: error.message });
    }
});

/**
 * DELETE /catways/:id/reservations/:idReservation
 * Supprime une réservation.
 */
/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprime une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Numéro du catway
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la réservation
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       404:
 *         description: Réservation introuvable
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id/reservations/:idReservation", async (req, res) => {
    try {
        const reservationSupprimee = await reservationsService.deleteReservation(req.params.idReservation);
        if (!reservationSupprimee) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }
        res.status(200).json({ message: "Réservation supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;