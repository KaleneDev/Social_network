import { useState } from "react";
import "../../style/components/Log/SearchBar.scss";
function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (event: any) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Ici, tu peux ajouter la logique pour effectuer la recherche avec la valeur `searchQuery`
        
        console.log("Recherche effectuée:", searchQuery);
    };
    return (
        <form onSubmit={handleSubmit} className="searchBar-container">
            <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Rechercher..."
            />
            <button type="submit"><span>Rechercher</span><span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></span></button>
        </form>
    );
}
export default SearchBar;
