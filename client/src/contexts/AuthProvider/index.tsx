import React, {createContext, useState} from "react";
import { IAuthProvider, IContext, IUser } from "../../types/types";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({children}: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>()

    async function authenticate(email: string, password: string) {

    };

    function logOut() {

    }

    return (
        <AuthContext.Provider value={{...user, authenticate,logOut }}>
            {children}
        </AuthContext.Provider>
    )
}