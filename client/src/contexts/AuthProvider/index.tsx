import React, { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "../../types/types";
import {
  getUserLocalStorage,
  Login,
  setUserLocalStorage,
} from "../../utils/util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) setUser(user);
  }, []);

  async function authenticate(email: string, password: string) {
    const response = await Login(email, password);

    const payload = { token: response.token, email };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  function logOut() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
