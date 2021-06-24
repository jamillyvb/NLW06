import { Request, Response, NextFunction } from "express";

export function ensureAdmin(request: Request, response: Response, next: NextFunction){
    //Verificar se o usuraio é admin
    const admin = true;
    // se for admin (tem a premissao)
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