// import axios from "axios";

// export const GET_USER = "GET_USER";

// export const getUser = (uid: string) => {
//     return (dispatch: any) => {
//         axios
//             .get(`${import.meta.env.VITE_APP_URL}users/id/${uid}`)
//             .then((res) => {
//                 dispatch({ type: GET_USER, payload: res.data })
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };
// }
import axios from "axios";
import { Dispatch } from "redux";

export const GET_USER = "GET_USER";

export const getUser = (uid: string) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_URL}users/id/${uid}`
        );
        const userData = response.data;

        dispatch({ type: GET_USER, payload: userData });
    } catch (error) {
        console.log(error);
    }
};
