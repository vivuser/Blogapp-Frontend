'use client'
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName ] = useState(null)

    useEffect(() => {
        const localUserId = JSON.parse(localStorage.getItem('userData'))?.userId
        const localUserName = JSON.parse(localStorage.getItem('userData'))?.name
        console.log(localUserId, 'localUserId')
        console.log(localUserName, 'localUserName')
        setUserId(localUserId)
        setUserName(localUserName)
    }, [])

    return (
        <UserContext.Provider value={{ userId, setUserId, userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}