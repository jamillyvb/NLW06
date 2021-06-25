import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs";


interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService{
    //se admin não vinher preenchido -> usuario igual a falso
    async execute({name, email, admin =  false, password} : IUserRequest){
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
        // aqui ele vai converter a senha para criptografada
        const passwordHash = await hash(password, 8)

        //se usuario não existir ai salva ele na base de dados
        const user = usersRepository.create({
            name,
            email,
            admin,
            // senha sem criptografia: senha criptografada
            password: passwordHash,
        });

        await usersRepository.save(user);
        return user;
    }
}

export {CreateUserService}