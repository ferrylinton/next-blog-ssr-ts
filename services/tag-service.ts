import Tag from "@/models/Tag";
import connect from "@/utils/mongodb";
import { isObjectIdOrHexString } from "mongoose";

export const findAllJson = async () => {
    await connect();
    const tags = await Tag.find();

    return tags.map(tag =>JSON.parse(JSON.stringify(tag.toJSON())))
}

export const find = async () => {
    await connect();
    return await Tag.find().lean();
}

export const findOneById = async (id: string): Promise<any> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    const tag = await Tag.findById(id);

    if (tag) {
        return tag.toJSON();
    } else {
        return null;
    }
}

export const save = async (input: TagType): Promise<TagType> => {
    await connect();
    const tag = await Tag.create(input);

    return tag.toJSON();
}

export const update = async (id: string, body: any): Promise<any> => {
    await connect();
    const { name } = body;

    const tag = await Tag.findById(id);

    if (tag) {
        tag.name = name;
        tag.save();

        return tag;
    } else {
        return null;
    }
}

export const deleteOneById = async (id: string) => {
    return await Tag.findByIdAndRemove(id);
}