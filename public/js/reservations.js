/**
 * Script de gestion des réservations : sélection d'un catway,
 * liste, création, suppression de ses réservations.
 */

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

const catwaySelect = document.getElementById("catwaySelect");
const reservationsList = document.getElementById("reservationsList");
const createForm = document.getElementById("createForm");
const createError = document.getElementById("createError");

/**
 * Charge la liste des catways dans le menu déroulant de sélection.
 * @returns {Promise<void>}
 */
async function chargerCatwaysDansSelect() {
    try {
        const response = await fetch("/catways", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const catways = await response.json();

        catwaySelect.innerHTML = "";
        catways.forEach((catway) => {
            const option = document.createElement("option");
            option.value = catway.catwayNumber;
            option.textContent = `Catway n°${catway.catwayNumber}`;
            catwaySelect.appendChild(option);
        });

        if