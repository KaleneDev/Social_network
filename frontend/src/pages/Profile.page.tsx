import { useSelector } from "react-redux";
import "../style/components/pages/profile.scss";


function Profile() {
    const profile = useSelector((state: any) => state.userReducer);

    return (
        <div className="profile">
            <div className="container-profile">
                <h1>Profile</h1>
                <div>Bienvenue {profile.username}</div>
                <div>{profile.email}</div>
                <div>
                    <img src={profile.avatar} alt="" />
                </div>
            </div>
        </div>
    );
}
export default Profile;
