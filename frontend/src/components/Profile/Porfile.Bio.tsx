import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
import { Dispatch } from "redux";
import { updateBio } from "../../redux/user/user.action";
import Success from "../Infos/success";
import { ZoomOut } from "../../utils/AnimationText";

function ContainerBio() {
    const profile = useSelector((state: any) => state.userReducer.user);
    const success = useSelector(
        (state: any) => state.userReducer.successUpdateBio
    );

    const [bio, setBio] = useState<any>(profile.bio);
    const [upForm, setUpForm] = useState<boolean>(false);
    const dispatch = useDispatch<Dispatch<any>>();

    const dateStr = new Date(profile.createdAt);
    const date = moment(dateStr).locale("fr");
    const dateFr = date.format("DD/MM/YYYY à HH:mm:ss");
    // SUCCESS
    const successRef = useRef(success);
    useEffect(() => {
        successRef.current = success;
    }, [success]);
    // REF
    const containerSuccessRef = useRef<any>(null);
    const handleUpdate = async (e: any) => {
        e.preventDefault();
        const data = {
            bio: bio,
        };
        await dispatch(updateBio(profile.id, data));

        if (successRef) {
            containerSuccessRef.current.style.visibility = "visible";
            containerSuccessRef.current.style.opacity = "1";
            setTimeout(() => {
                containerSuccessRef.current.style.opacity = "0";
                setTimeout(() => {
                    containerSuccessRef.current.style.visibility = "hidden";
                }, 1000);
            }, 8000);
        }
        if (upForm === false) {
            setUpForm(!upForm);
        }
        if (upForm === true) {
            setUpForm(!upForm);
        }
    };
    useEffect(() => {}, [success, containerSuccessRef]);
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

    return (
        <>
            <ZoomOut>
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
                        />
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
            </ZoomOut>
            {success && (
                <Success
                    text="Votre bio a bien été mis à jour"
                    ref={containerSuccessRef}
                />
            )}
        </>
    );
}

export default ContainerBio;
