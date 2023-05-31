import AuthorityModel from "@/models/authority-model";
import connect from "@/utils/mongodb";
import { CreateAuthorityType } from "@/validations/authority-schema";
import { isObjectIdOrHexString } from "mongoose";

export const findAllJson = async (): Promise<any> => {
    const authorities = await find();
    return authorities.map(authority => JSON.parse(JSON.stringify(authority.toJSON())))
}

export const findAllNamesJson = async (): Promise<any> => {
    const authorities = await find();
    return authorities.map(authority => authority.name)
}

export const findByIdJson = async (id: string): Promise<any> => {
    const tag = await findById(id);

    if (tag) {
        return JSON.parse(JSON.stringify(tag.toJSON()));
    } else {
        return null;
    }
}

export const find = async () => {
    await connect();
    return await AuthorityModel.find();
}

export const findById = async (id: string): Promise<any> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    const authority = await AuthorityModel.findById(id);

    if (authority) {
        return authority.toJSON();
    } else {
        return null;
    }
}

export const save = async (input: CreateAuthorityType): Promise<AuthorityType> => {
    await connect();
    const authority = await AuthorityModel.create(input);

    return authority;
}

export const update = async (id: string, body: any): Promise<any> => {
    await connect();
    const { name } = body;

    const authority = await AuthorityModel.findById(id);

    if (authority) {
        authority.name = name;
        return await authority.save();
    } else {
        return null;
    }
}

export const deleteById = async (id: string) => {
    return await AuthorityModel.findByIdAndRemove(id);
}