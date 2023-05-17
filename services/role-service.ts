import Authority from "@/models/Authority";
import Role from "@/models/Role";
import connect from "@/utils/mongodb";
import { CreateRoleType } from "@/validations/role-schema";
import { isObjectIdOrHexString } from "mongoose";


export const find = async () => {
    await connect();
    return await Role.find();
}

export const findOneById = async (id: string): Promise<any> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    const role = await Role.findById(id);

    if (role) {
        return role.toJSON();
    } else {
        return null;
    }
}

export const save = async (input: CreateRoleType): Promise<RoleType> => {
    await connect();

    const { name } = input;
    let authorities: AuthorityType[] = [];

    if (input.authorities) {
        authorities = await Authority.find({ name: { "$in": input.authorities } });
    }

    const role = await Role.create({name, authorities});

    return role.toJSON();
}

export const update = async (id: string, body: any): Promise<any> => {
    await connect();
    const { name } = body;

    const role = await Role.findById(id);

    if (role) {
        role.name = name;
        role.save();

        return role;
    } else {
        return null;
    }
}

export const deleteOneById = async (id: string) => {
    return await Role.findByIdAndRemove(id);
}