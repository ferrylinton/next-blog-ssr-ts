import Tag from "@/models/Tag";
import connect from "@/utils/mongodb";
import { CreateTagType } from "@/validations/tag-schema";
import { isObjectIdOrHexString } from "mongoose";

export const findAllJson = async (): Promise<TagType[]> => {
    const tags = await find();
    return tags.map(tag => JSON.parse(JSON.stringify(tag.toJSON())))
}

export const findByIdJson = async (id: string): Promise<TagType | null> => {
    const tag = await findById(id);

    if (tag) {
        return JSON.parse(JSON.stringify(tag.toJSON()));
    } else {
        return null;
    }
}

export const find = async () => {
    await connect();
    return await Tag.find();
}

export const findById = async (id: string): Promise<any> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    const tag = await Tag.findById(id);

    if (tag) {
        return tag;
    } else {
        return null;
    }
}

export const save = async (input: CreateTagType): Promise<TagType> => {
    await connect();
    const tag = await Tag.create(input);

    return tag;
}

export const update = async (id: string, body: any): Promise<TagType | null> => {
    await connect();
    const { name } = body;

    const tag = await Tag.findById(id);

    if (tag) {
        tag.name = name;
        tag.updatedAt = new Date().toISOString();
        await tag.save();
        return tag;
    } else {
        return null;
    }
}

export const deleteById = async (id: string): Promise<TagType | null> => {
    return await Tag.findByIdAndRemove(id);
}