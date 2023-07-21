// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type initialState = {
//     value: AuthState;
// };
// type AuthState = {
//     isAuth: boolean;
//     uid: string;
//     role: string;
//     username: string;
// };
// const initialState = {
//     value: {
//         isAuth: false,
//         username: "",
//         uid: "",
//         role: "user",
//     } as AuthState,
// } as initialState;

// export const auth = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         logOut: () => {
//             return initialState;
//         },
//         logIn: (state, action: PayloadAction<AuthState>) => {
//             return {
//                 value: {
//                     isAuth: true,
//                     username: action.payload.username,
//                     uid: action.payload.uid,
//                     role: action.payload.role,
//                 },
//             };
//         },
//     },
// });

// export const { logOut, logIn } = auth.actions;
// export default auth.reducer;