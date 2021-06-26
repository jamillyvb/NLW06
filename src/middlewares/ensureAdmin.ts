import { Request, Response, NextFunction } from "express";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction){
    
    const { user_id } = request;

    const usersRepositories = getCustomRepository(UsersRepositories);
    
    const { admin } = await  usersRepositories.findOne(user_id);

    //Verificar se o usuraio é admin, se for admin (tem a premissao)
    if(admin){
        return next();
    }
    //retorna essa resposta
    // https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
    return response.status(401).json({
        error: "Unauthorized",
    });
}

//middlewares é o que fica no meio da requisição, entre a requisição e resposta e intercepta