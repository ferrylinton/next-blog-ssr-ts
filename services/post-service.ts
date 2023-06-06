import PostModel from "@/models/post-model";
import TagModel from "@/models/tag-model";
import { PostDocumentType, PostType } from "@/types/post-type";
import { TagType } from "@/types/tag-type";
import connect from "@/utils/mongodb";
import { PER_PAGE, getPageParams, getTotalPage } from "@/utils/page";
import { CreatePostType } from "@/validations/post-schema";
import { isObjectIdOrHexString } from "mongoose";


export const findAllJson = async (): Promise<Array<PostType>> => {
    await connect();
    const posts: Array<PostDocumentType> = await PostModel.find();
    return posts.map(doc => {
        return JSON.parse(JSON.stringify(doc.toJSON()))
    })
}

export const findByIdJson = async (id: string): Promise<PostType | null> => {
    const post = await findById(id);

    if (post) {
        return JSON.parse(JSON.stringify(post.toJSON()));
    } else {
        return null;
    }
}

export const find = async (pageParams: PageParamsType): Promise<Pageable<PostDocumentType>> => {
    await connect();
    const { page, keyword } = getPageParams(pageParams);
    const listQuery = PostModel.find();
    const countQuery = PostModel.count();

    if (keyword.length > 0) {
        const regex: RegExp = RegExp(keyword as string, 'i');
        listQuery.regex("name", regex);
        countQuery.regex("name", regex);
    }

    listQuery
        .skip(((page - 1) * PER_PAGE))
        .limit(PER_PAGE).sort({ name: 1 })
        .allowDiskUse(true);

    const [items, total] = await Promise.all([listQuery.exec(), countQuery.exec()]);

    return {
        keyword,
        items,
        total,
        page,
        totalPage: getTotalPage(total),
        perPage: PER_PAGE
    };
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
        console.log(tags);
    }


    const post = await PostModel.create({ slug, title, description, content, tags });

    return post.toJSON();
}

export const update = async (id: string, input: CreatePostType): Promise<any> => {
    await connect();
    let tags: TagType[] = [];
    const { slug, title, description, content } = input;
    const post = await PostModel.findById(id);

    if (post) {
        if (input.tags) {
            tags = await TagModel.find({ name: { "$in": input.tags } });
            post.tags = tags;
        }

        post.slug = slug;
        post.title = title;
        post.description = description;
        post.content = content;
        post.save();

        return post;
    } else {
        return null;
    }
}

export const deleteById = async (id: string) => {
    return await PostModel.findByIdAndRemove(id);
}