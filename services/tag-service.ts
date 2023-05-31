import TagModel from "@/models/tag-model";
import connect from "@/utils/mongodb";
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
    return await TagModel.find();
}

export const findById = async (id: string): Promise<any> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    const tag = await TagModel.findById(id);

    if (tag) {
        return tag;
    } else {
        return null;
    }
}

export const save = async (input: TagFromType): Promise<TagType> => {
    await connect();
    const tag = await TagModel.create(input);

    return tag;
}

export const update = async (id: string, body: any): Promise<TagType | null> => {
    await connect();
    const { name } = body;

    const tag = await TagModel.findById(id);

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
    return await TagModel.findByIdAndRemove(id);
}