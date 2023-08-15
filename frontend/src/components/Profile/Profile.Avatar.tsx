import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadPicture } from "../../redux/user/user.action";
import { Dispatch } from "redux";
import { ZoomOut } from "../../utils/AnimationText";

function ContainerAvatar() {
    const dispatch = useDispatch<Dispatch<any>>();
    const profile = useSelector((state: any) => state.userReducer.user);
    const [file, setFile] = useState<any>(null);
    const uid = useSelector((state: any) => state.userReducer);

    const handlePicture = (e: any) => {
        e.preventDefault();
        if (file && uid.user.id && uid.user.username) {
            const data = new FormData();
            data.append("userId", uid.user.id);
            data.append("username", uid.user.username);
            data.append("file", file);

            dispatch(uploadPicture(data));
        }
    };
    const [highlight, setHighlight] = useState(false);
    const [preview, setPreview] = useState("");
    const [drop, setDrop] = useState(false);
    const [usernameDisplay, setUsernameDisplay] = useState<string>(
        profile.username
    );
    const refInputFile = useRef<any>(null);
    const usernameRef = useRef<any>(null);

    useEffect(() => {
        setUsernameDisplay(profile.username);
    }, [preview, drop, highlight, profile.username]);
    const handleEnter = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        console.log("enter!");

        preview === "" && setHighlight(true);
    };
    const handleOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        console.log("over!");

        setHighlight(true);
    };
    const handleLeave = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("leave!");
        setHighlight(false);
    };
    const handleUpload = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("drop upload!");
        setHighlight(false);
        setDrop(true);
        const [file] = e.target.files || e.dataTransfer.files;
        setFile(file);
        uploadFile(file);
    };
    const handleUploadOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("drop!");

        setHighlight(false);
        setDrop(true);
        const [file] = e.target.files || e.dataTransfer.files;
        setFile(file);

        uploadFile(file);
    };
    function uploadFile(file: any) {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = () => {
            // this is the base64 data
            if (typeof reader.result === "string") {
                const fileRes = btoa(reader.result);
                setPreview(`data:image/jpg;base64,${fileRes}`);
            }
        };
        reader.onerror = () => {
            console.log("There is a problem while uploading...");
        };
    }
    const handleContainerImageClick = () => {
        if (refInputFile.current) {
            refInputFile.current.click();
        }
    };
    return (
        <ZoomOut>
            <div className="container-avatar">
                <h1 ref={usernameRef}>Profil de {usernameDisplay}</h1>

                <div className="upload-picture-container">
                    <div
                        className={`container-image${drop ? " is-drop" : ""}`}
                        onClick={handleContainerImageClick}
                        onDrop={(e) => handleUpload(e)}
                        onDragEnter={(e) => handleEnter(e)}
                        onDragOver={(e) => handleOver(e)}
                        onDragLeave={(e) => handleLeave(e)}
                        onChange={(e) => handleUploadOver(e)}
                    >
                        <div
                            className={`preview${
                                highlight ? " is-highlight" : ""
                            }`}
                            style={{ backgroundImage: `url(${preview})` }}
                        ></div>

                        <img src={profile.avatar} alt="" />
                    </div>
                    <br />
                    <form
                        action=""
                        onSubmit={(e) => handlePicture(e)}
                        className="upload-picture"
                        id="upload-form"
                    >
                        <label htmlFor="file" className="label-file">
                            Changer d'image
                        </label>
                        <br />
                        <input
                            type="file"
                            name="file"
                            id="file"
                            className="inputfile btn-file__input"
                            accept="image/*"
                            onChange={(e) => handleUpload(e)}
                            ref={refInputFile}
                        />
                        <input
                            type="submit"
                            className="submit-button"
                            value="Envoyer"
                        />
                    </form>
                    <br />
                </div>
            </div>
        </ZoomOut>
    );
}

export default ContainerAvatar;
