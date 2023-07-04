import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import UploadImage from "./UploadImage";
import moment from "moment";
import "moment/locale/fr";
import { useDispatch } from "react-redux";
import { updateBio } from "../../actions/user.action";
import { Dispatch } from "redux";

function UpdateProfile() {
    const profile = useSelector((state: any) => state.userReducer);
    const [dataChild, setDataChild] = useState<any>([]);
    const preview = useRef<any>(null);
    const [bio, setBio] = useState<any>([]);
    const [upForm, setUpForm] = useState<boolean>(false);
    const dispatch = useDispatch<Dispatch<any>>();

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
    useEffect(() => {
        //   setBio(profile.bio);
    }, [dataChild, bio]);

    return (
        <div className="profile">
            <div className="container-profile">
                <h1>Profile de {profile.username}</h1>
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

                    {/* <textarea
                        onClick={() => {
                            setUpForm(upForm === false);
                        }}
                        typeof="text"
                        name="bio"
                        id="bio"
                        onChange={(e) => setBio(e.target.value)}
                        defaultValue={profile.bio}
                        className="bio-inactive"
                    ></textarea> */}
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
                    <input type="text" name="username" id="username" />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />

                    <input
                        className="submit-button"
                        type="submit"
                        value="Envoyer"
                    />
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;
