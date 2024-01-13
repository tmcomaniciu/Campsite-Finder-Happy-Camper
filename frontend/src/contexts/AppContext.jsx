import React, { useContext, useState } from "react";
import PropTypes from 'prop-types';
import Toast from "../components/Toast";
import * as apiClient from "../api-client.js"
import { useQuery } from 'react-query';

const AppContext = React.createContext({
  showToast: () => {}, 
  isLoggedIn: false
});

export const AppContextProvider = ({ children }) => {
    const [toast, setToast] = useState(undefined);

    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    });

    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage);
            },
            isLoggedIn: !isError
        }}>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
            {children}
        </AppContext.Provider>
    );
};

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};
