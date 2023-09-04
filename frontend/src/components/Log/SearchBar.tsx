import { useState } from "react";
import "../../style/components/Log/SearchBar.scss";
import { searchArticles } from "../../redux/articles/articles.action";
import { useDispatch } from "react-redux";
function SearchBar() {
    const dispatch = useDispatch() as any;
    const [searchQuery, setSearchQuery] = useState("");


    const handleChange = (event: any) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const encodedSearchQuery = encodeURIComponent(searchQuery);
        if (searchQuery === "%") {
            dispatch(searchArticles("*"));
        } else
        if (searchQuery !== "") {
            dispatch(searchArticles(encodedSearchQuery));
        }  else {
            dispatch(searchArticles("*"));
        }
    };
    return (
            <form onSubmit={handleSubmit} className="searchBar-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder="Rechercher..."
                />
                <button type="submit">
                    <span>Rechercher</span>
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                        >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    </span>
                </button>
            </form>
    );
}
export default SearchBar;
