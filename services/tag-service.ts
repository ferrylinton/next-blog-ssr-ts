import TagModel from "@/models/tag-model";
import { TagDocumentType, TagFormType, TagType } from "@/types/tag-type";
import connect from "@/utils/mongodb";
import { PER_PAGE, getPageParams, getTotalPage } from "@/utils/page";
import { isObjectIdOrHexString } from "mongoose";


export const findAllJson = async (): Promise<Array<TagType>> => {
    await connect();
    const tags: Array<TagDocumentType> = await TagModel.find();
    return tags.map(doc => {
        return JSON.parse(JSON.stringify(doc.toJSON()))
    })
}

export const findAllNamesJson = async (): Promise<Array<string>> => {
    await connect();
    const tags = await TagModel.find().sort({ name: 1 });
    return tags.map(tag => tag.name)
}

export const findByIdJson = async (id: string): Promise<TagType | null> => {
    const tag = await findById(id);

    if (tag) {
        return JSON.parse(JSON.stringify(tag.toJSON()));
    } else {
        return null;
    }
}

export const find = async (pageParams: PageParamsType): Promise<Pageable<TagDocumentType>> => {
    await connect();
    const { page, keyword } = getPageParams(pageParams);
    const listQuery = TagModel.find();
    const countQuery = TagModel.count();

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
    await connect();

    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    const tag = await TagModel.findById(id);

    if (tag) {
        return tag;
    } else {
        return null;
    }
}

export const save = async (input: TagFormType): Promise<TagType> => {
    await connect();
    return await TagModel.create(input);
}

export const update = async (id: string, {name, logo}: TagFormType): Promise<TagType | null> => {
    await connect();
    const tag = await TagModel.findById(id);

    if (tag) {
        tag.name = name;
        tag.logo = logo;
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