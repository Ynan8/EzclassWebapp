import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// initial state
const initialState = {
    user: null
};

// create context
const Context = createContext()

// root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.user };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};

// context provider
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        if (user && token) {
            axios.defaults.headers.common['authtoken'] = token;
            dispatch({
                type: "LOGIN",
                user: user,
            });
        }
    }, []);

    axios.interceptors.response.use(
        function (response) {
            return response;
        }, 
        function (error) {
            let res = error.response;
            if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
                // Consider handling token expiration more gracefully here
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatch({ type: 'LOGOUT' });
                router.push('/');
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    );

    return (
        <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    );
};

export { Context, Provider };
