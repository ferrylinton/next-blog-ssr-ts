import Role from "@/models/Role";
import User from "@/models/User";
import connect from "@/utils/mongodb";
import { CreateUserType } from "@/validations/user-schema";
import { isObjectIdOrHexString } from "mongoose";


export const find = async () => {
    return await User.find();
}

export const findOneById = async (id: string): Promise<any> => {
    if (!isObjectIdOrHexString(id)) {
        return null;
    }

    await connect();
    const user = await User.findById(id);

    if (user) {
        return user.toJSON();
    } else {
        return null;
    }
}

export const save = async ({email, password}: CreateUserType): Promise<UserType> => {
    await connect();
    const role = await Role.findOne({name : 'Admin'})
    const user = await User.create({email, password, role});

    return user.toJSON();
}

export const update = async (id: string, body: any): Promise<any> => {
    await connect();
    const { name } = body;

    const user = await User.findById(id);

    if (user) {
        user.name = name;
        user.save();

        return user;
    } else {
        return null;
    }
}

export const deleteOneById = async (id: string) => {
    return await User.findByIdAndRemove(id);
}