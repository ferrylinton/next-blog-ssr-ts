import { Document, Model } from 'mongoose';


export type BasicAuthorityType = {
    name: string,
    createdAt: string,
    updatedAt: string
}

export type AuthorityType = {
    id: string,
    __v: number
} & BasicAuthorityType

export type AuthorityDocumentType = BasicAuthorityType & Document;

export type AuthorityModelType = Model<AuthorityDocumentType>;

export type AuthorityFormType = {
    id?: string,
    name?: string
}