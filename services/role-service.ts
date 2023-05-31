import AuthorityModel from "@/models/authority-model";
import RoleModel from "@/models/role-model";
import connect from "@/utils/mongodb";
import { isObjectIdOrHexString } from "mongoose";

export const findAllJson = async (): Promise<any> => {
    const roles = await find();
    return roles.map(role => JSON.parse(JSON.stringify(role.toJSON())))
}

export const findByIdJson = async (id: string): Promise<any> => {
    const role = await findById(id);

    if (role) {
        return JSON.parse(JSON.stringify(role.toJSON()));
    } else {
        return null;
    }
}

export const find = async () => {
    await connect();
    return await RoleModel.find();
}

export const findById = async (id: string): Promise<any> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    return await RoleModel.findById(id).populate({ path: 'authorities', select: 'name' });
}

export const save = async (input: CreateRoleType): Promise<any> => {
    await connect();

    let authorities: any = [];

    if (input.authorities) {
        authorities = await AuthorityModel.find({ name: { "$in": input.authorities } });
    }

    return await RoleModel.create({ name: input.name, authorities });
}

export const update = async (id: string, input: CreateRoleType): Promise<any> => {
    await connect();
    let authorities: any = [];

    if (input.authorities) {
        authorities = await AuthorityModel.find({ name: { "$in": input.authorities } });
    }

    const role = await RoleModel.findById(id);

    if (role) {
        role.name = input.name;
        role.authorities = authorities;
        role.save();

        return role;
    } else {
        return null;
    }
}

export const deleteById = async (id: string) => {
    return await RoleModel.findByIdAndRemove(id);
}