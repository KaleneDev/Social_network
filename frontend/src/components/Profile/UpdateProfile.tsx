import ContainerAvatar from "./Profile.Avatar";
import ContainerBio from "./Porfile.Bio";
import ContainerProfileUp from "./Profile.Update.tsx";
import ContainerDelete from "./Profile.Delete";

function UpdateProfile() {
    return (
        <div className="profile">
            <ContainerAvatar />
            <ContainerBio />
            <ContainerProfileUp />
            <ContainerDelete />
        </div>
    );
}

export default UpdateProfile;
