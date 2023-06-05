import AuthorityModel, { IAuthority, IAuthorityDocument, IAuthorityType } from "@/models/authority-model";
import connect from "@/utils/mongodb";
import { PER_PAGE, getTotalPage } from "@/utils/page";
import { CreateAuthorityType } from "@/validations/authority-schema";
import { isObjectIdOrHexString } from "mongoose";

export const findAllJson = async (): Promise<Array<IAuthorityType>> => {
    await connect();
    const authorities: Array<IAuthorityDocument> = await AuthorityModel.find();
    return authorities.map(doc => {
        return JSON.parse(JSON.stringify(doc.toJSON()))
    })
}

export const findAllNamesJson = async (): Promise<Array<string>> => {
    await connect();
    const authorities = await AuthorityModel.find();
    return authorities.map(authority => authority.name)
}

export const findByIdJson = async (id: string): Promise<IAuthorityType | null> => {
    const authority = await findById(id);

    if (authority) {
        return JSON.parse(JSON.stringify(authority.toJSON()));
    } else {
        return null;
    }
}

export const find = async ({ keyword, page }: PageParamsType): Promise<Pageable<IAuthorityDocument>> => {
    await connect();
    const listQuery = AuthorityModel.find();
    const countQuery = AuthorityModel.count();
    const pageInteger = (page && typeof page === 'string') ? parseInt(page as string) : 1;
    const keywordString = (keyword && typeof keyword === 'string') ? keyword as string : '';

    if (keywordString.length > 0) {
        const regex: RegExp = RegExp(keyword as string, 'i');
        listQuery.regex("name", regex);
        countQuery.regex("name", regex);
    }

    listQuery
        .skip(((pageInteger - 1) * PER_PAGE))
        .limit(PER_PAGE).sort({ name: 1 })
        .allowDiskUse(true);

    const [items, total] = await Promise.all([listQuery.exec(), countQuery.exec()]);

    return {
        keyword : keywordString,
        items,
        total,
        page: pageInteger,
        totalPage: getTotalPage(total),
        perPage: PER_PAGE
    };
}

export const findById = async (id: string): Promise<IAuthorityDocument | null> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    return await AuthorityModel.findById(id);
}

export const save = async (input: CreateAuthorityType): Promise<IAuthorityDocument> => {
    await connect();
    const authority = await AuthorityModel.create(input);

    return authority;
}

export const update = async (id: string, input: CreateAuthorityType): Promise<IAuthorityDocument | null> => {
    await connect();
    const authority = await AuthorityModel.findById(id);

    if (authority) {
        authority.name = input.name;
        return await authority.save();
    } else {
        return null;
    }
}

export const deleteById = async (id: string): Promise<IAuthorityDocument | null> => {
    return await AuthorityModel.findByIdAndRemove(id);
}