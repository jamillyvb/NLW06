import { EntityRepository, Repository } from "typeorm"
import { User } from "../entities/User";

@EntityRepository(User)
//extendeu os metodos da classe userrepository
//isso é oq precisa para criar um repositorio
class UsersRepositories extends Repository<User>{}

export { UsersRepositories };