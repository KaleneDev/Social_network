import React from "react";

function Header() {
    function swapElements(array, index1, index2) {
        if (
            index1 < 0 ||
            index1 >= array.length ||
            index2 < 0 ||
            index2 >= array.length
        ) {
            // Vérifier si les index sont valides
            console.log("Les index sont invalides.");
            return;
        }
        // Intervertir les valeurs des deux éléments
        [array[index1], array[index2]] = [array[index2], array[index1]];

        console.log(array);
    }

    const array = [12, -2, 55, 68, 80];

    swapElements(array, 0, 4);
    return <div>Header</div>;
}

export default Header;
