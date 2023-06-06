import { Document, Model } from 'mongoose';
import { RoleType } from './role-type';


export type BasicUserType = {
    email: string,
    password: string,
    loginAttempt: number,
    activated: boolean,
    locked: boolean,
    createdAt: string,
    updatedAt: string,
    role: RoleType
}

export type UserType = {
    id: string,
    __v: number
} & BasicUserType

export type UserDocumentType = BasicUserType & Document;

export type UserModelType = Model<UserDocumentType>;

export type CreateUserType = {
    email: string
    password: string,
    passwordConfirm: string,
    role: string,
    allRoles?: string[]
}

export type UpdateUserType = {
    id: string,
    email: string
    role: string,
    allRoles: string[]
}