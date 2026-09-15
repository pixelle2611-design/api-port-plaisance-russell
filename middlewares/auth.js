const jwt = require("jsonwebtoken");

/**
 * Middleware qui vérifie la présence et la validité d'un token JWT
 * dans le header Authorization avant de laisser passer la requête.
 */
function verifierToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Accès refusé : token manquant" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Accès refusé : token manquant" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide ou expiré" });
    }
}

module.exports = verifierToken;