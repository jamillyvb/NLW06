import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";

class ListTagsService {
    
    async execute(){
        const tagsRepositories = getCustomRepository(TagsRepositories);
       
        const tags = await tagsRepositories.find();
        // customizar a tag
        // tags = tags.map((tag) => ({...tag, nameCustom: `#${tag.name}`}))
       //classToPlain cria novos objetos apartir dos que já tem do typeorm
        return classToPlain(tags);
    }
}

export { ListTagsService };