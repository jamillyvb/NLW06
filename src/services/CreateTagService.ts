import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService{

    async execute(name: string){
        const tagsRepositories = getCustomRepository(TagsRepositories); 
       //verifica se o nome está preenchido, se não tiver retorna error
        if(!name){
            throw new Error("Incorrect name!");
        }

        //SELECT * FROM TAGS WHERE
        //verifica se tag existe
        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        });
        //se já existir uma tag emite msg e não salva a tag
        if(tagAlreadyExists){
            throw new Error("Tag already exists!");
        }
        //se não existir a tag, cria uma referencia utilizando repositorio 
        const tag = tagsRepositories.create({
            name,
        });
        //salva infromação
        await tagsRepositories.save(tag);
        return tag;
    }
}
export {CreateTagService};