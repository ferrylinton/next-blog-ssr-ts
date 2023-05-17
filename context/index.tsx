import React, { PropsWithChildren, createContext, useContext } from 'react';
import { ToastContainer } from 'react-toastify'
import Alerts from "@/context/alerts"

type appContextType = {
    AlertSuccess: (msg: string) => void,
    AlertWarning: (msg: string) => void,
    AlertError: (msg: string) => void,
    AlertInfo: (msg: string) => void,
};

const appContextDefaultValues: appContextType = Object.assign({}, Alerts);

export const AppContext = createContext<appContextType>(appContextDefaultValues)

export const AppProvider = ({ children }: PropsWithChildren) => {

    const value = Object.assign({}, Alerts);

    return (
        <AppContext.Provider value={value}>
            {children}
            <ToastContainer />
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);

