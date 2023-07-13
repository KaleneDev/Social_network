import "../../style/pages/Profile/ContainerDelete.scss";
function ContainerDelete() {
    return (
        <div className="container-delete">
            <h1>Supprimer le compte</h1>
            <p>Attention, cette action est irréversible</p>
            <button>Supprimer</button>
        </div>
    );
}

export default ContainerDelete;
