import { Document, Model } from 'mongoose';


export type BasicRoleType = {
    name: string,
    createdAt: string,
    updatedAt: string,
    authorities: any
}

export type RoleType = {
    id: string,
    __v: number
} & BasicRoleType

export type RoleDocumentType = BasicRoleType & Document;

export type RoleModelType = Model<RoleDocumentType>;

export type RoleFormType = {
    id?: string,
    name: string,
    authorities: string[],
    allAuthorities?: string[]
}