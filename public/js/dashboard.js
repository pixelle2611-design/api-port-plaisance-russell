/**
 * Script du tableau de bord.
 * Vérifie l'authentification, affiche les infos utilisateur,
 * la date du jour, et les réservations en cours.
 */

const token = localStorage.getItem("token");
const userEmail = localStorage.getItem("userEmail");

if (!token) {
    window.location.href = "index.html";
}

document.getElementById("userEmail").textContent = userEmail || "";
document.getElementById("userName").textContent = userEmail ? userEmail.split("@")[0] : "";

const today = new Date();
document.getElementById("todayDate").textContent = today.toLocaleDateString("fr-FR");

/**
 * Charge toutes les réservations en cours (date du jour comprise
 * entre startDate et endDate) en parcourant tous les catways.
 * @returns {Promise<void>}
 */
async function chargerReservationsEnCours() {
    try {
        const catwaysResponse = await fetch("/catways", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const catways = await catwaysResponse.json();

        const tbody = document.getElementById("reservationsTableBody");
        tbody.innerHTML = "";

        for (const catway of catways) {
            const reservationsResponse = await fetch(`/catways/${catway.catwayNumber}/reservations`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const reservations = await reservationsResponse.json();

            reservations.forEach((reservation) => {
                const debut = new Date(reservation.startDate);
                const fin = new Date(reservation.endDate);

                if (today >= debut && today <= fin) {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${catway.catwayNumber}</td>
                        <td>${reservation.clientName}</td>
                        <td>${reservation.boatName}</td>
                        <td>${debut.toLocaleDateString("fr-FR")}</td>
                        <td>${fin.toLocaleDateString("fr-FR")}</td>
                    `;
                    tbody.appendChild(row);
                }
            });
        }
    } catch (error) {
        console.error("Erreur lors du chargement des réservations :", error);
    }
}

chargerReservationsEnCours();

document.getElementById("logoutBtn").addEventListener("click", async () => {
    try {
        await fetch("/logout");
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
    } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        window.location.href = "index.html";
    }
});