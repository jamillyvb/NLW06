import "reflect-metadata";
import express, { Request, Response, NextFunction} from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";//ctrl click e aponta para o database
import { RepositoryNotTreeError } from "typeorm";
//@types/express
const app = express();

app.use(express.json());

app.use(router);

//midway de rro se passa 4 parametros
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {

        // o middleware aqui serviu para capturar o erro

        //verificar se esse erro aqui é o mesmo erro do CreateUserService
        //se o erro é da instancia err
        if (err instanceof Error) {
            return response.status(400).json({
                error: err.message,
            });
        }
        
        //se for qualquer outro tipo de error
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
);

app.listen(3000, () => console.log("Server is running"));
/** metodos para usar com o protocolo http
 * GET => usar sempre que eu quiser buscar uma informação(qualquer busca que eu for fazer na minha api)
 * POST => usar quando quer inserir(criar) uma informação dentro da api
 * PUT => usar quando quer alterar uma informação (alterar dados do user/nome, email..) sempre que tiver uma alteração/manipulação usar  o put
 * DELETE => usar quando remover um dado
 * PATCH => usar quando for alterar uma informação específica
 */


/**
 * Tipos de Parâmetros
 * Routes params =>(são os parametros que fazem parte da nossa rota) http://localhost:3000/produtos/72860362978230
 * Query params =>(parametros que fazem parte  de uma query-exemplo de quando queremos fazer um 'filtro', usuario quer pesquisar produtos especificos então ele filtra a pesquisa)  http://localhost:3000/produtos?name=teclado&description=tecladobom&
 *
 * Body Params =>{(são os paramentros que usa para metodo post, get.. que vem no corpo da requisição)
 * "name": "teclado",
 * "description": "teclado bom"
 * }
 */
/*
//uma rota de teste
app.get("/test", (request, response) =>{
    // request => tudo que tá entrando
    // response => tudo que tá saindo
    return response.send("Olá NLW"); // funciona sem o return mas o certo é com ele //dependendo de como colocar ele fica preso em um luping
})

app.post("/test-post", (request, response) => {
    return response.send("Olá NLW método POST");
});
*/
    // http://localhost:3000
