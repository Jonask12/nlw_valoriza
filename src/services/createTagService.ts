import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";


class CreateTagService {
    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        // verifica se não tem nome preenchido
        if (!name) {
            throw new Error("Incorret name");
        }

        // SELECT * FROM TAGS WHERE NAME = 'name'
        const tagAlreadyExists = await tagsRepositories.findOne({
            name,
        });

        if (tagAlreadyExists) {
            throw new Error("tag already exists");
        }

        const tag = tagsRepositories.create({
            name,
        });

        await tagsRepositories.save(tag);
        return tag;
    }
}

export { CreateTagService };