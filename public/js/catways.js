/**
 * Script de gestion des catways : liste, création,
 * modification de l'état, suppression.
 */

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

const catwaysList = document.getElementById("catwaysList");
const createForm = document.getElementById("createForm");
const createError = document.getElementById("createError");

/**
 * Récupère et affiche la liste de tous les catways.
 * @returns {Promise<void>}
 */
async function chargerCatways() {
    try {
        const response = await fetch("/catways", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const catways = await response.json();

        catwaysList.innerHTML = "";

        catways.forEach((catway) => {
            const article = document.createElement("article");
            article.innerHTML = `
                <h3>Catway n°${catway.catwayNumber} (${catway.catwayType})</h3>
                <label for="state-${catway.catwayNumber}">État</label>
                <textarea id="state-${catway.catwayNumber}" rows="2" cols="40">${catway.catwayState}</textarea>
                <button class="updateBtn" data-number="${catway.catwayNumber}">Modifier l'état</button>
                <button class="deleteBtn" data-number="${catway.catwayNumber}">Supprimer</button>
            `;
            catwaysList.appendChild(article);
        });

        document.querySelectorAll(".updateBtn").forEach((btn) => {
            btn.addEventListener("click", () => modifierEtat(btn.dataset.number));
        });
        document.querySelectorAll(".deleteBtn").forE