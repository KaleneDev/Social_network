import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { getUser } from "../redux/users/users.action";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ProfileUser() {
    const { userId } = useParams();
    const dispatch = useDispatch<Dispatch<any>>();
    const profile = useSelector((state: any) => state.profileReducer.profile);
    useEffect(() => {
        if (userId) {
            dispatch(getUser(userId));
        }
    }, [userId]);

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <h1>Profile Page</h1>
            {profile && (
                <div>
                    <h2>{profile.username}</h2>
                    <h2>{profile.email}</h2>
                    <h2>{profile.bio}</h2>
                </div>
            )}
        </div>
    );
}

export default ProfileUser;
