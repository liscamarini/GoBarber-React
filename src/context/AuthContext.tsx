import React, { createContext, useCallback } from 'react';

interface AuthContextState {
    name: string;
    singnIn(): void;
}

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }) => {

    const singnIn = useCallback(() => {
        console.log(singnIn);
    }, []);

    return (
        <AuthContext.Provider value={{ name: 'Lais', singnIn}}>
            {children}
        </AuthContext.Provider>
    );
};

