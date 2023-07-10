import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.action";

function UploadImage(props: any) {
    const [file, setFile] = useState<any>(null);
    const dispatch = useDispatch<Dispatch<any>>();
    const uid = useSelector((state: any) => state.userReducer);
    const handlePicture = () => {
        // e.preventDefault();
        if (file && uid.id && uid.username) {
            const data = new FormData();
            data.append("userId", uid.id);
            data.append("username", uid.username);
            data.append("file", file);

            dispatch(uploadPicture(data));
        }
    };
    const [highlight, setHighlight] = useState(false);
    const [preview, setPreview] = useState("");
    const [drop, setDrop] = useState(false);
    const refInputFile = useRef<any>(null);

    const data = {
        drop: drop,
        preview: preview,
        highlight: highlight,
        refInputFile: refInputFile,
    };
    useEffect(() => {
        props.propsChild(data);
        const refParentPreview = props.propsParent.preview.current;
        const refParentContainer = props.propsParent.containerImage.current;

        if (refParentPreview || refParentContainer) {
            refParentPreview.addEventListener("dragenter", handleEnter);
            refParentPreview.addEventListener("dragover", handleOver);
            refParentPreview.addEventListener("dragleave", handleLeave);
            refParentPreview.addEventListener("drop", handleUpload);
            refParentPreview.addEventListener("change", handleUploadOver);
        }
    }, [preview, drop, highlight]);
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
        console.log("drop!");
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

    return (
        <div className="upload-picture-container">
            <div
                onDragEnter={(e) => handleEnter(e)}
                onDragLeave={(e) => handleLeave(e)}
                onDragOver={(e) => handleOver(e)}
                onDrop={(e) => handleUploadOver(e)}
                className={`upload${
                    highlight ? " is-highlight" : drop ? " is-drop" : ""
                }`}
                style={{ backgroundImage: `url(${preview})` }}
            ></div>
            <br />
            <form
                action=""
                onSubmit={handlePicture}
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
    );
}

export default UploadImage;
