//importou o request e reponse de dentro do express
import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

//
class CreateUserController {
    //como tava tudo dentro de outra class que não acesso a essa variavel, ai tem que definir a tipagem (response: Response)  
    async handle(request: Request, response: Response) {       
        
            //pegou o nome email admin do banco e trouxe para cá
            const { name, email, admin, password } = request.body;

            const createUserService = new CreateUserService();
            //passando o nome email admin que recebeu do request.body
            const user = await createUserService.execute({ name, email, admin, password });

            return response.json(user);

    }
}

export { CreateUserController };