/**
 * Gère la soumission du formulaire de connexion.
 * Envoie les identifiants à l'API, stocke le token reçu,
 * puis redirige vers le tableau de bord en cas de succès.
 */
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            loginError.textContent = data.message || "Erreur de connexion";
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        window.location.href = "dashboard.html";

    } catch (error) {
        loginError.textContent = "Erreur serveur, réessayez plus tard.";
    }
});