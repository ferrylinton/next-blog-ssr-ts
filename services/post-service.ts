import PostModel from "@/models/post-model";
import TagModel from "@/models/tag-model";
import connect from "@/utils/mongodb";
import { CreatePostType } from "@/validations/post-schema";
import { isObjectIdOrHexString } from "mongoose";

export const findAllJson = async (): Promise<any> => {
    const users = await find();
    return users.map(user => JSON.parse(JSON.stringify(user.toJSON())))
}

export const findByIdJson = async (id: string): Promise<any> => {
    const post = await findById(id);

    if (post) {
        return JSON.parse(JSON.stringify(post.toJSON()));
    } else {
        return null;
    }
}

export const find = async () => {
    await connect();
    return await PostModel.find().populate('tags');
}

export const findById = async (id: string): Promise<any> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    return await PostModel.findById(id).populate({ path: 'tags', select: 'name' });
}

export const save = async (input: CreatePostType): Promise<PostType> => {
    await connect();

    const { slug, title, description, content } = input;
    let tags: TagType[] = [];

    if (input.tags) {
        tags = await TagModel.find({ name: { "$in": input.tags } });
    }


    const post = await PostModel.create({ slug, title, description, content, tags });

    return post.toJSON();
}

export const update = async (id: string, body: any): Promise<any> => {
    await connect();
    const { name } = body;

    const post = await PostModel.findById(id);

    if (post) {
        post.name = name;
        post.save();

        return post;
    } else {
        return null;
    }
}

export const deleteById = async (id: string) => {
    return await PostModel.findByIdAndRemove(id);
}