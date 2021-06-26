import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}
export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    // receber token
    const authToken = request.headers.authorization;

    // verificar se token está preenchido
    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "e4aed36c3a5df2df3505330faca08397") as IPayload;

        request.user_id = sub;
        console.log();

        return next();
    } catch (err) {
        return response.status(401).end();
    }

    // validar se token é valido
}