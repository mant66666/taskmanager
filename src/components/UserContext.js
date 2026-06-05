import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext(null);


export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch (error) {
            localStorage.removeItem('user');
            return null;
        }
    });
    
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };
    
    const value = { user, login, logout };
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}


export function useUserData() {
    return useContext(UserContext);
}
