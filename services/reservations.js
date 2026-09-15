/**
 * Couche de service pour la gestion des réservations.
 * Contient la logique métier d'accès aux données, sans dépendance à Express.
 */

const Reservation = require("../models/reservation");

/**
 * Récupère toutes les réservations d'un catway donné.
 * @param {number} catwayNumber - Le numéro du catway concerné
 * @returns {Promise<Array>} La liste des réservations pour ce catway
 */
async function getReservationsByCatway(catwayNumber) {
    return await Reservation.find({ catwayNumber });
}

/**
 * Récupère une réservation en particulier grâce à son identifiant.
 * @param {string} reservationId - L'identifiant MongoDB de la réservation
 * @returns {Promise<Object|null>} La réservation trouvée, ou null si elle n'existe pas
 */
async function getReservationById(reservationId) {
    return await Reservation.findById(reservationId);
}

/**
 * Crée une nouvelle réservation pour un catway.
 * @param {Object} data - Les informations de la réservation à créer
 * @param {number} data.catwayNumber - Le numéro du catway réservé
 * @param {string} data.clientName - Le nom du client
 * @param {string} data.boatName - Le nom du bateau
 * @param {string|Date} data.startDate - La date de début de réservation
 * @param {string|Date} data.endDate - La date de fin de réservation
 * @returns {Promise<Object>} La réservation nouvellement créée
 */
async function createReservation(data) {
    const reservation = new Reservation({
        catwayNumber: data.catwayNumber,
        clientName: data.clientName,
        boatName: data.boatName,
        startDate: data.startDate,
        endDate: data.endDate,
    });
    return await reservation.save();
}

/**
 * Met à jour une réservation existante.
 * @param {string} reservationId - L'identifiant de la réservation à modifier
 * @param {Object} data - Les nouvelles informations de la réservation
 * @returns {Promise<Object|null>} La réservation mise à jour, ou null si elle n'existe pas
 */
async function updateReservation(reservationId, data) {
    return await Reservation.findByIdAndUpdate(
        reservationId,
        {
            clientName: data.clientName,
            boatName: data.boatName,
            startDate: data.startDate,
            endDate: data.endDate,
        },
        { new: true }
    );
}

/**
 * Supprime une réservation grâce à son identifiant.
 * @param {string} reservationId - L'identifiant de la réservation à supprimer
 * @returns {Promise<Object|null>} La réservation supprimée, ou null si elle n'existait pas
 */
async function deleteReservation(reservationId) {
    return await Reservation.findByIdAndDelete(reservationId);
}

module.exports = {
    getReservationsByCatway,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
};