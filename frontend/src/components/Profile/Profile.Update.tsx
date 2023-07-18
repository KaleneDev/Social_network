import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { updateUser } from "../../redux/user/user.action";
import Success from "../Infos/success";
import "../../style/pages/Profile/Profile.Update.scss";

function ContainerProfileUp() {
    const profile = useSelector((state: any) => state.userReducer.user);
    const error = useSelector((state: any) => state.userReducer.error);
    const success = useSelector(
        (state: any) => state.userReducer.successUpdateUser
    );

    const dispatch = useDispatch<Dispatch<any>>();
    const [username, setUsername] = useState<string>(profile.username);

    // REF
    const containerSuccessRef = useRef<any>(null);

    // INPUT
    const [email, setEmail] = useState<string>();
    const [oldPassword, setOldPassword] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    // ERRORS
    const [oldPasswordError, setOldPasswordError] = useState<boolean>(false);
    const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
    // SUCCESS
    const successRef = useRef(success);
    const errorRef = useRef(error);

    useEffect(() => {
        successRef.current = success;
        errorRef.current = error;
    }, [success, error]);

    const handleProfile = async (e: any) => {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            oldPassword: oldPassword,
            newPassword1: newPassword,
            newPassword2: confirmPassword,
        };

        await dispatch(updateUser(profile.id, data));

        if (successRef) {
            if (oldPassword === "" || oldPassword === undefined) {
                setOldPasswordError(false);
            }
            if (newPassword === "" || newPassword === undefined) {
                setNewPasswordError(false);
            }
            containerSuccessRef.current.style.visibility = "visible";
            containerSuccessRef.current.style.opacity = "1";
            setTimeout(() => {
                containerSuccessRef.current.style.opacity = "0";
                setTimeout(() => {
                    containerSuccessRef.current.style.visibility = "hidden";
                }, 1000);
            }, 8000);
        }
    };

    useEffect(() => {
        if (error.errors) {
            if (error.errors.oldPassword && success === false) {
                setOldPasswordError(true);
            } else {
                setOldPasswordError(false);
            }
            if (error.errors.newPassword && success === false) {
                setNewPasswordError(true);
            } else {
                setNewPasswordError(false);
            }
        }
    }, [
        oldPassword,
        username,
        oldPasswordError,
        newPasswordError,
        error,
        profile.username,
    ]);
    return (
        <div className="container-profile-Up">
            <h3>Modifier votre profil</h3>
            <form action="">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    defaultValue={profile.username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={profile.email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                />
                <label htmlFor="oldPassword">Ancien mot de passe</label>
                <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    onChange={(e) => {
                        setOldPassword(e.target.value);
                    }}
                    autoComplete="new-password"
                />

                {oldPasswordError && (
                    <p className="error">{error.errors.oldPassword}</p>
                )}
                <label htmlFor="newPassword1">Nouveau mot de passe</label>
                <input
                    type="password"
                    name="newPassword1"
                    id="newPassword1"
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="off"
                />
                {newPasswordError && (
                    <p className="error">{error.errors.newPassword}</p>
                )}
                <label htmlFor="NewPassword2">Confirmer mot de passe</label>
                <input
                    type="password"
                    name="NewPassword2"
                    id="NewPassword2"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="off"
                />
                <input
                    className="submit-button"
                    type="submit"
                    value="Envoyer"
                    onClick={(e) => {
                        handleProfile(e);
                    }}
                />
            </form>
            {success && (
                <Success
                    text="Votre profile a bien été mis à jour"
                    ref={containerSuccessRef}
                />
            )}
        </div>
    );
}

export default ContainerProfileUp;
