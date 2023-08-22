import "../../style/pages/Home/PUT_Articles.home.scss";

function UPDATE_Articles(props: any) {
    const handleUpdateArticles = (e: any) => {
        e.preventDefault();
        const dataChildren = {
            index: props.index,
            article_id: props.propsParent,
        };
        
        props.onPopupOpenChange(dataChildren);
    };

    return (
        <>
            <button
                className="btn-update"
                onClick={(e) => handleUpdateArticles(e)}
            >
                Modifier
            </button>
        </>
    );
}

export default UPDATE_Articles;
