import { useContext, useState, useEffect } from "react";
import { UserIdContext } from "../components/AppContext";
import "../style/components/pages/profile.scss";
import axios from "axios";

interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;
}
function Profile() {
    const [profile, setProfile] = useState<User>({
        id: 0,
        username: "",
        email: "",
        avatar: "",
    });

    const uid = useContext(UserIdContext);
    console.log(uid);
    useEffect(() => {
        if (uid) {
            const getUserProfile = async () => {
                await axios
                    .get(`${import.meta.env.VITE_APP_URL}users/id/${uid}`, {
                        withCredentials: true,
                    })
                    .then((response) => {
                        setProfile(response.data);
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };
            getUserProfile();
        }
    }, [uid]);
    return (
        <div className="profile">
            <div className="container-profile">
                <h1>Profile</h1>
                <div>{profile.username}</div>
                <div>{profile.email}</div>
                <div><img src={profile.avatar} alt="" /></div>
            </div>
        </div>
    );
}
export default Profile;
