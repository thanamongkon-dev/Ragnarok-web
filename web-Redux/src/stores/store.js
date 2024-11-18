import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import authReducer from "./slices/authSlice";
import signUpReducer from "./slices/signUpSlice";
import cashReducer from "./slices/cashSlice";
import serverReducer from "./slices/serverSlice";

export const store = configureStore({
    reducer : {
        counter : counterReducer,
        auth: authReducer,
        signUp: signUpReducer,
        cash: cashReducer,
        server: serverReducer,
    }
})

