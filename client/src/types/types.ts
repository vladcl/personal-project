export interface IUser {
    email?: string,
    token?: string,
};

export interface ICredentials {
    login: string,
    password: string,
};

export interface IContext extends IUser {
    authenticate: (email: string, password: string) => Promise<void>;
    logOut: () => void;
};

export interface IAuthProvider {
    children: JSX.Element;
}