import AuthorityModel from "@/models/authority-model";
import { AuthorityDocumentType, AuthorityType } from "@/types/authority-type";
import connect from "@/utils/mongodb";
import { PER_PAGE, getTotalPage } from "@/utils/page";
import { CreateAuthorityType } from "@/validations/authority-schema";
import { isObjectIdOrHexString } from "mongoose";

export const findAllJson = async (): Promise<Array<AuthorityType>> => {
    await connect();
    const authorities: Array<AuthorityDocumentType> = await AuthorityModel.find();
    return authorities.map(doc => {
        return JSON.parse(JSON.stringify(doc.toJSON()))
    })
}

export const findAllNamesJson = async (): Promise<Array<string>> => {
    await connect();
    const authorities = await AuthorityModel.find().sort({ name: 1 });
    return authorities.map(authority => authority.name)
}

export const findByIdJson = async (id: string): Promise<AuthorityType | null> => {
    const authority = await findById(id);

    if (authority) {
        return JSON.parse(JSON.stringify(authority.toJSON()));
    } else {
        return null;
    }
}

export const find = async ({ keyword, page }: PageParamsType): Promise<Pageable<AuthorityDocumentType>> => {
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

export const findById = async (id: string): Promise<AuthorityDocumentType | null> => {
    await connect();

    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    return await AuthorityModel.findById(id);
}

export const save = async (input: CreateAuthorityType): Promise<AuthorityDocumentType> => {
    await connect();
    const authority = await AuthorityModel.create(input);

    return authority;
}

export const update = async (id: string, input: CreateAuthorityType): Promise<AuthorityDocumentType | null> => {
    await connect();
    const authority = await AuthorityModel.findById(id);

    if (authority) {
        authority.name = input.name;
        return await authority.save();
    } else {
        return null;
    }
}

export const deleteById = async (id: string): Promise<AuthorityDocumentType | null> => {
    return await AuthorityModel.findByIdAndRemove(id);
}