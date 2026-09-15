/**
 * Couche de service pour la gestion des catways.
 * Contient la logique métier d'accès aux données, sans dépendance à Express.
 */

const Catway = require("../models/catway");

/**
 * Récupère la liste de tous les catways.
 * @returns {Promise<Array>} La liste des catways enregistrés
 */
async function getAllCatways() {
    return await Catway.find();
}

/**
 * Récupère un catway en particulier grâce à son numéro.
 * @param {number} catwayNumber - Le numéro du catway recherché
 * @returns {Promise<Object|null>} Le catway trouvé, ou null s'il n'existe pas
 */
async function getCatwayByNumber(catwayNumber) {
    return await Catway.findOne({ catwayNumber });
}

/**
 * Crée un nouveau catway en base de données.
 * @param {Object} data - Les informations du catway à créer
 * @param {number} data.catwayNumber - Le numéro unique du catway
 * @param {string} data.catwayType - Le type du catway ("long" ou "short")
 * @param {string} data.catwayState - L'état du catway
 * @returns {Promise<Object>} Le catway nouvellement créé
 */
async function createCatway(data) {
    const catway = new Catway({
        catwayNumber: data.catwayNumber,
        catwayType: data.catwayType,
        catwayState: data.catwayState,
    });
    return await catway.save();
}

/**
 * Met à jour uniquement l'état d'un catway existant.
 * Le numéro et le type ne doivent jamais être modifiables (règle métier du brief).
 * @param {number} catwayNumber - Le numéro du catway à modifier
 * @param {string} newState - Le nouvel état à enregistrer
 * @returns {Promise<Object|null>} Le catway mis à jour, ou null s'il n'existe pas
 */
async function updateCatwayState(catwayNumber, newState) {
    return await Catway.findOneAndUpdate(
        { catwayNumber },
        { catwayState: newState },
        { new: true }
    );
}

/**
 * Supprime un catway grâce à son numéro.
 * @param {number} catwayNumber - Le numéro du catway à supprimer
 * @returns {Promise<Object|null>} Le catway supprimé, ou null s'il n'existait pas
 */
async function deleteCatway(catwayNumber) {
    return await Catway.findOneAndDelete({ catwayNumber });
}

module.exports = {
    getAllCatways,
    getCatwayByNumber,
    createCatway,
    updateCatwayState,
    deleteCatway,
};