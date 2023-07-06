import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import UploadImage from "./UploadImage";
import moment from "moment";
import "moment/locale/fr";
import { useDispatch } from "react-redux";
import { updateBio } from "../../actions/user.action";
import { updateUser } from "../../actions/user.action";
import { Dispatch } from "redux";

function UpdateProfile() {
    const profile = useSelector((state: any) => state.userReducer);
    const [dataChild, setDataChild] = useState<any>([]);
    const preview = useRef<any>(null);
    const [bio, setBio] = useState<any>([]);
    const [upForm, setUpForm] = useState<boolean>(false);
    const dispatch = useDispatch<Dispatch<any>>();

    const [username, setUsername] = useState<string>(profile.username);
    const [email, setEmail] = useState<string>();
    const [oldPassword, setOldPassword] = useState<string>(profile.password);
    const [newPassword, setNewPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    const dateStr = new Date(profile.createdAt);
    const date = moment(dateStr).locale("fr");
    const dateFr = date.format("DD/MM/YYYY à HH:mm:ss");

    const handleDataChild = (data: any) => {
        setDataChild(data);
    };

    const handleUpdate = (e: any) => {
        e.preventDefault();
        console.log(upForm);

        if (upForm === false) {
            setUpForm(!upForm);
        }
        if (upForm === true) {
            setUpForm(!upForm);
        }
        dispatch(updateBio(profile.id, bio));
    };
    const handleSwitch = () => {
        console.log("switch");

        if (upForm === false) {
            setUpForm(!upForm);
        }
    };
    const handleChange = (e: any) => {
        if (upForm === false) {
            setUpForm(!upForm);
        }
        setBio(e.target.value);
    };
    const handleProfile = (e: any) => {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            oldPassword: oldPassword,
            newPassword1: newPassword,
            newPassword2: confirmPassword,
        };
        
        console.log(data);
        
        dispatch(updateUser(profile.id, data));
        
        setUsername(profile.username);
        setEmail(profile.email);
        setOldPassword(profile.password);
    };
    useEffect(() => {

        // setUsername(profile.username);

    }, [
        dataChild,
        bio,
        username,
        email,
        oldPassword,
        newPassword,
        confirmPassword,
        profile.username,
        profile.email,
        profile.password,
    ]);

    return (
        <div className="profile">
            <div className="container-profile">
                <h1>Profile de {profile}</h1>
                <div
                    className={`container-image${
                        dataChild.drop ? " is-drop" : ""
                    }`}
                >
                    <div
                        className={`preview${
                            dataChild.highlight ? " is-highlight" : ""
                        }`}
                        ref={preview}
                        style={{ backgroundImage: `url(${dataChild.preview})` }}
                    ></div>
                    <img src={profile.avatar} alt="" />
                </div>
                <UploadImage
                    propsChild={handleDataChild}
                    propsParent={preview}
                />
            </div>
            <div className="container-bio">
                <div className="bio-update">
                    <h3>Bio</h3>
                    <textarea
                        typeof="text"
                        name="bio"
                        id="bio"
                        onChange={(e) => handleChange(e)}
                        onClick={() => handleSwitch()}
                        defaultValue={profile.bio}
                        className={`${
                            upForm
                                ? " bio-active"
                                : !upForm
                                ? " bio-inactive"
                                : ""
                        }`}
                    ></textarea>
                    {!upForm && (
                        <>
                            <button
                                type="submit"
                                onClick={() => setUpForm(!upForm)}
                            >
                                Modifier
                            </button>
                        </>
                    )}
                    {upForm && (
                        <>
                            <button type="submit" onClick={handleUpdate}>
                                Valider
                            </button>
                        </>
                    )}
                </div>
                <p className="createAt">Membre depuis le : {dateFr}</p>
            </div>
            <div className="container-profile-Up">
                <h3>Modifier votre profile</h3>
                <form action="">
                    <label htmlFor="username">Username</label>
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
                        onChange={(e) => setOldPassword(e.target.value)}
                        autoComplete="off"
                    />
                    <label htmlFor="newPassword1">Nouveau mot de passe</label>
                    <input
                        type="password"
                        name="newPassword1"
                        id="newPassword1"
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="off"
                    />
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
            </div>
        </div>
    );
}

export default UpdateProfile;
