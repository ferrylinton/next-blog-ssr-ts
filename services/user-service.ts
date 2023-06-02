import RoleModel from "@/models/role-model";
import UserModel from "@/models/user-model";
import connect from "@/utils/mongodb";
import { isObjectIdOrHexString } from "mongoose";

export const findAllJson = async (): Promise<any> => {
    const users = await find();
    return users.map(user => JSON.parse(JSON.stringify(user.toJSON())))
}

export const findByIdJson = async (id: string): Promise<any> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    const user = await UserModel.findById(id).populate({ path: 'role', select: 'name' }).lean();

    if (user) {
        return JSON.parse(JSON.stringify(user));
    } else {
        return null;
    }
}

export const find = async () => {
    await connect();
    return await UserModel.find().populate({ path: 'role', select: 'name' });;
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
            console.log(doc);
            const role = doc.role.name;
            const authorities = doc.role.authorities.map((authority : any) => authority.name)
            doc.role = role;
            doc.authorities = authorities;
            return doc;
        });
}

export const save = async ({ email, password, role }: CreateUserType): Promise<UserType> => {
    await connect();
    const roleObject = await RoleModel.findOne({ name: role });
    return await UserModel.create({ email, password, role: roleObject });
}

export const update = async (id: string, { email, role }: CreateUserType): Promise<any> => {
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

export const deleteById = async (id: string) => {
    return await UserModel.findByIdAndRemove(id);
}