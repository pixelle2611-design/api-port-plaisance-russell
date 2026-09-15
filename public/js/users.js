/**
 * Script de gestion des utilisateurs : liste, création, suppression.
 */

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

const usersList = document.getElementById("usersList");
const createForm = document.getElementById("createForm");
const createError = document.getElementById("createError");

/**
 * Récupère et affiche la liste de tous les utilisateurs.
 * @returns {Promise<void>}
 */
async function chargerUsers() {
    try {
        const response = await fetch("/users", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const users = await response.json();

        usersList.innerHTML = "";

        users.forEach((user) => {
            const article = document.createElement("article");
            article.innerHTML = `
                <h3>${user.username}</h3>
                <p>Email : <span>${user.email}</span></p>
                <button class="deleteBtn" data-email="${user.email}">Supprimer</button>
            `;
            usersList.appendChild(article);
        });

        document.querySelectorAll(".deleteBtn").forEach((btn) => {
            btn.addEventListener("click", () => supprimerUser(btn.dataset.email));
        });

    } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
    }
}

/**
 * Supprime un utilisateur.
 * @param {string} email - L'email de l'utilisateur à supprimer
 * @returns {Promise<void>}
 */
async function supprimerUser(email) {
    try {
        await fetch(`/users/${email}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        chargerUsers();
    } catch (error) {