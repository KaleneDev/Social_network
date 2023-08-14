// tokenExpiration.js

// Récupérer le JWT et la date d'expiration depuis le localStorage
const storedJwt = localStorage.getItem("jwt");
const storedExpiration = localStorage.getItem("jwtExpiration");

if (storedJwt && storedExpiration) {
    const expirationTime = parseInt(storedExpiration);
    const currentTime = new Date().getTime();

    if (currentTime < expirationTime) {
        // Le JWT est encore valide
        console.log("Le JWT est encore valide");
    } else {
        // Le JWT a expiré, vous pouvez le supprimer du localStorage
        localStorage.removeItem("jwt");
        localStorage.removeItem("jwtExpiration");
        console.log("Le JWT a expiré et a été supprimé");
    }
} else {
    console.log("Pas de JWT dans le localStorage");
}
