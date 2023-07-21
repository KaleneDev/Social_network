import "../../style/pages/Profile/Profile.Delete.scss";
import { ZoomOut } from "../../utils/AnimationText";

function ContainerDelete() {
    return (
        <ZoomOut>
            <div className="container-delete">
                <h1>Supprimer le compte</h1>
                <p>Attention, cette action est irréversible</p>
                <button>Supprimer</button>
            </div>
        </ZoomOut>
    );
}

export default ContainerDelete;
