import AuthorityModel from "@/models/authority-model";
import RoleModel, { IRoleDocument, IRoleType } from "@/models/role-model";
import connect from "@/utils/mongodb";
import { PER_PAGE, getPageParams, getTotalPage } from "@/utils/page";
import { isObjectIdOrHexString } from "mongoose";

export const findAllJson = async (): Promise<Array<IRoleType>> => {
    await connect();
    const roles: Array<IRoleDocument> = await RoleModel.find();
    return roles.map(doc => {
        return JSON.parse(JSON.stringify(doc.toJSON()))
    })
}

export const findAllNamesJson = async (): Promise<Array<string>> => {
    await connect();
    const roles = await RoleModel.find();
    return roles.map(role => role.name)
}

export const findByIdJson = async (id: string): Promise<IRoleType | null> => {
    const role = await findById(id);

    if (role) {
        return JSON.parse(JSON.stringify(role.toJSON()));
    } else {
        return null;
    }
}

export const find = async (pageParams: PageParamsType): Promise<Pageable<IRoleDocument>> => {
    await connect();
    const { page, keyword } = getPageParams(pageParams);
    const listQuery = RoleModel.find();
    const countQuery = RoleModel.count();

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


export const findById = async (id: string): Promise<IRoleDocument | null> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    return await RoleModel.findById(id).populate({ path: 'authorities', select: 'name' });
}

export const save = async (input: RoleFormType): Promise<IRoleDocument | null> => {
    await connect();

    let authorities: any = [];

    if (input.authorities) {
        authorities = await AuthorityModel.find({ name: { "$in": input.authorities } });
    }

    return await RoleModel.create({ name: input.name, authorities });
}

export const update = async (id: string, input: RoleFormType): Promise<IRoleDocument | null> => {
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

export const deleteById = async (id: string): Promise<IRoleDocument | null> => {
    return await RoleModel.findByIdAndRemove(id);
}