import api from "../services/api";
import { IUser } from "../types/types";

export function setUserLocalStorage (user: IUser | null) {
    localStorage.setItem('t', JSON.stringify(user));
};

export function getUserLocalStorage () {
    const json = localStorage.getItem('t');

    if(!json) 
        return null;

    const user = JSON.parse(json);

    return user ?? null;
}

export async function Login(email: string, password: string) {
    try {
        const request = await api.post('/login', {email, password});

        return request.data;
    } catch (err) {
        return null;
    }
}