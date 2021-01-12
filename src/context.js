import React, { useContext, useState } from 'react';
const AppContext = React.createContext('');

const AppProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState('');
    return <AppContext.Provider value={{
        setIsLoggedIn,
        isLoggedIn,
        setUserInfo,
        userInfo,
        isEditing,
        editID,
        setIsEditing,
        setEditID
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider}