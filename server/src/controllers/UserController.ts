import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

export default {
    async login(req: Request, res: Response) {
        try {
            const {login, password} = req.body;

            if(!login || !password) return res.status(400).json({message: 'O(A) usuário/senha não foi encontrado(a)'});

            // const user = await User.
        } catch (err) {
            
        }
    }
}