import ImageModel from "@/models/image-model";
import { ImageDocumentType, ImageFormType, ImageType } from "@/types/image-type";
import connect from "@/utils/mongodb";
import { PER_PAGE, getPageParams, getTotalPage } from "@/utils/page";
import { isObjectIdOrHexString } from "mongoose";


export const findAllJson = async (): Promise<Array<ImageType>> => {
    await connect();
    const images: Array<ImageDocumentType> = await ImageModel.find();
    return images.map(doc => {
        return JSON.parse(JSON.stringify(doc.toJSON()))
    })
}

export const findAllNamesJson = async (): Promise<Array<string>> => {
    await connect();
    const images = await ImageModel.find().sort({ name: 1 });
    return images.map(image => image.name)
}

export const findByIdJson = async (id: string): Promise<ImageType | null> => {
    const image = await findById(id);

    if (image) {
        return JSON.parse(JSON.stringify(image.toJSON()));
    } else {
        return null;
    }
}

export const find = async (pageParams: PageParamsType): Promise<Pageable<ImageDocumentType>> => {
    await connect();
    const { page, keyword } = getPageParams(pageParams);
    const listQuery = ImageModel.find();
    const countQuery = ImageModel.count();

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

    const image = await ImageModel.findById(id);

    if (image) {
        return image;
    } else {
        return null;
    }
}

export const save = async (input: any): Promise<ImageDocumentType> => {
    await connect();
    const image = await ImageModel.create(input);
    return image;
}

export const update = async (id: string, body: any): Promise<ImageType | null> => {
    await connect();
    const { name } = body;

    const image = await ImageModel.findById(id);

    if (image) {
        image.name = name;
        image.updatedAt = new Date().toISOString();
        await image.save();
        return image;
    } else {
        return null;
    }
}

export const deleteById = async (id: string): Promise<ImageType | null> => {
    return await ImageModel.findByIdAndRemove(id);
}