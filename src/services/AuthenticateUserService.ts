import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        // UTILIDADE: seleciona a variavel + ctrl d = edita as duas. 

        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email,
            
        });
        // essa mensage de email ou senha é importante contra hackers
        if(!user){
            throw new Error("Email/Password incorrect");
        }

        // Verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/Password incorrect");
        }

        //gerar token
        const token = sign(
            {
                email: user.email
            },
            "5fd8cdb1f3eab35bcb796f92d35b3817", 
            {
                subject: user.id,
                expiresIn: "1d",
            }
        );
        return token;
    }
}

export { AuthenticateUserService }