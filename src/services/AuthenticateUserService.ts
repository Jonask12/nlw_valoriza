import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);
        // verificando se o email já existe
        const user = await usersRepositories.findOne({
            email,
        });

        if (!user) {
            throw new Error("Email/Password incorrect");
        }

        // verificando se a senha está correta
        // 12345 / 7894848-sdhfhsdf75656518
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        // gerando o token
        const token = sign({
            email: user.email
        }, "e4aed36c3a5df2df3505330faca08397", {
            subject: user.id,
            expiresIn: "1d"
        });
        return token;
    }
}

export { AuthenticateUserService };