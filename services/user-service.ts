import RoleModel from "@/models/role-model";
import UserModel from "@/models/user-model";
import { CreateUserType, UserDocumentType, UserType } from "@/types/user-type";
import connect from "@/utils/mongodb";
import { PER_PAGE, getPageParams, getTotalPage } from "@/utils/page";
import { isObjectIdOrHexString } from "mongoose";


export const findAllJson = async (): Promise<Array<UserType>> => {
    await connect();
    const users: Array<UserDocumentType> = await UserModel.find();
    return users.map(doc => {
        return JSON.parse(JSON.stringify(doc.toJSON()))
    })
}

export const findByIdJson = async (id: string): Promise<UserType | null> => {
    await connect();

    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    const user = await UserModel.findById(id).populate({ path: 'role', select: 'name' });

    if (user) {
        return JSON.parse(JSON.stringify(user));
    } else {
        return null;
    }
}

export const find = async (pageParams: PageParamsType): Promise<Pageable<UserDocumentType>> => {
    await connect();
    const { page, keyword } = getPageParams(pageParams);
    const listQuery = UserModel.find();
    const countQuery = UserModel.count();

    if (keyword.length > 0) {
        const regex: RegExp = RegExp(keyword as string, 'i');
        listQuery.regex("email", regex);
        countQuery.regex("email", regex);
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
    return await UserModel
        .findById(id)
        .populate({
            path: 'role',
            select: 'name',
            populate: {
                path: 'authorities',
                select: 'name',
            }
        })
        .then(doc => doc.toJSON({ virtuals: true }))
        .then(doc => {
            const role = doc.role.name;
            const authorities = doc.role.authorities.map((authority: any) => authority.name)
            doc.role = role;
            doc.authorities = authorities;
            return doc;
        });
}

export const save = async ({ email, password, role }: CreateUserType): Promise<UserDocumentType | null> => {
    await connect();
    const roleObject = await RoleModel.findOne({ name: role });
    return await UserModel.create({ email, password, role: roleObject });
}

export const update = async (id: string, { email, role }: CreateUserType): Promise<UserDocumentType | null> => {
    await connect();
    const user = await UserModel.findById(id);

    if (user) {
        user.email = email;
        user.role = await RoleModel.findOne({ name: role });
        user.save();

        return user;
    } else {
        return null;
    }
}

export const deleteById = async (id: string): Promise<UserDocumentType | null> => {
    return await UserModel.findByIdAndRemove(id);
}