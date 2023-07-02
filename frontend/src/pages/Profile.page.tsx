import { useContext, useState, useEffect } from "react";
import { UserIdContext } from "../components/AppContext";
import axios from "axios";
interface User {
    id: number;
    username: string;
    email: string;
}
function Profile() {
    const uid = useContext(UserIdContext);
    const [profile, setProfile] = useState<User>({id: 0, username: "", email: ""});
    useEffect(() => {
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
    }, []);
    return (
        <div>
            <h1>Profile</h1>
            <div>{profile.username}</div>
            <div>{profile.email}</div>

        </div>
    );
}
export default Profile;
