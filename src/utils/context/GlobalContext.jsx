import React, { createContext, useMemo, useReducer } from "react";

// initial state
export const initialState = {
    userData: null,
    paymentOptions: [],
};

// actions
export const ACTIONS = {
    CACHE_USER_DATA: "CACHE_USER_DATA",
    CACHE_PAYMENT_OPTIONS: "CACHE_PAYMENT_OPTIONS"
};

const Reducer = (globalState, action) => {
    switch (action.type) {
        case ACTIONS.CACHE_USER_DATA:
            return {
                ...globalState,
                userData: action.payload,
            }
        default:
            return globalState;
    }
};


// Global State Which its provide context for children
const GlobalState = ({ children, defaultInitialState = {} }) => {
    defaultInitialState = { ...initialState, ...defaultInitialState };

    const [globalState, dispatch] = useReducer(Reducer, defaultInitialState);

    const logoutUser = () => {
        localStorage.clear();
        return true;
    };

    const contextValue = useMemo(() => {
        return {
            globalState,
            dispatch,
            logoutUser
        };
    }, [globalState]);

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

// Create Global Context
export const GlobalContext = createContext(initialState);

// Export Global State Context Component
export default GlobalState;
