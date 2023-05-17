import Post from "@/models/Post";
import Tag from "@/models/Tag";
import connect from "@/utils/mongodb";
import { CreatePostType } from "@/validations/post-schema";
import { Document, Types, isObjectIdOrHexString } from "mongoose";


export const find = async () => {
    await connect();
    return await Post.find().populate('tags');
}

export const findOneById = async (id: string): Promise<any> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    const post = await Post.findById(id).populate({ path: 'tags', select: 'name' });

    if (post) {
        return post.toJSON();
    } else {
        return null;
    }
}

export const save = async (input: CreatePostType): Promise<PostType> => {
    await connect();

    const { slug, title, description, content } = input;
    let tags: TagType[] = [];

    if (input.tags) {
        tags = await Tag.find({ name: { "$in": input.tags } });
    }


    const post = await Post.create({slug, title, description, content, tags});

    return post.toJSON();
}

export const update = async (id: string, body: any): Promise<any> => {
    await connect();
    const { name } = body;

    const post = await Post.findById(id);

    if (post) {
        post.name = name;
        post.save();

        return post;
    } else {
        return null;
    }
}

export const deleteOneById = async (id: string) => {
    return await Post.findByIdAndRemove(id);
}