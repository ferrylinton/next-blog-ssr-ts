import Authority from "@/models/Authority";
import connect from "@/utils/mongodb";
import { CreateAuthorityType } from "@/validations/authority-schema";
import { isObjectIdOrHexString } from "mongoose";


export const find = async () => {
    await connect();
    return await Authority.find();
}

export const findOneById = async (id: string): Promise<any> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    const authority = await Authority.findById(id);

    if (authority) {
        return authority.toJSON();
    } else {
        return null;
    }
}

export const save = async (input: CreateAuthorityType): Promise<AuthorityType> => {
    await connect();
    const authority = await Authority.create(input);

    return authority.toJSON();
}

export const update = async (id: string, body: any): Promise<any> => {
    await connect();
    const { name } = body;

    const authority = await Authority.findById(id);

    if (authority) {
        authority.name = name;
        authority.save();

        return authority;
    } else {
        return null;
    }
}

export const deleteOneById = async (id: string) => {
    return await Authority.findByIdAndRemove(id);
}