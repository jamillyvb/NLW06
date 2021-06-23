import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService{
    async execute({name, email, admin} : IUserRequest){
        //se já existe user cadstrado com o email
        const usersRepository = getCustomRepository(UsersRepositories);

        console.log("Email", email);

        //se o email foi preenchido
        if(!email){
        //lançando exeção
            throw new Error("Email incorrect");
        }
        //verificar pelo email se existe user
        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        //se usuario não existir exibe a msg
        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        //se usuario não existir ai salva ele na base de dados
        const user = usersRepository.create({
            name,
            email,
            admin,
        });

        await usersRepository.save(user);
        return user;
    }
}

export {CreateUserService}