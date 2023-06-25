const signUpErrors = (err) => {
    let errors = { username: "", email: "", password: "mauvais password" };
    if (err.message.includes("username"))
        errors.username = "username incorrect ou déjà pris";
    if (err.message.includes("email"))
        errors.email = "email incorrect ou déjà pris";
    if (err.message.includes("password"))
        errors.password = "password incorrect";
    return errors;
};

const signInErrors = (err) => {
    let errors = { email: "", password: "" };
    if (err.message.includes("email")) errors.email = "email incorrect";
    if (err.message.includes("password"))
        errors.password = "Le mot de passe ne correspond pas";
    return errors;
};

module.exports = { signUpErrors, signInErrors };
