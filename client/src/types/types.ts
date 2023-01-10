export interface IUser {
    username?: string,
    token?: string,
};

export interface ICredentials {
    login: string,
    password: string,
};

export interface IContext extends IUser {
    authenticate: (username: string, password: string) => Promise<void>;
    logOut: () => void;
};

export interface IAuthProvider {
    children: JSX.Element;
}