import { Document, Model } from 'mongoose';


export type BasicTagType = {
    name: string,
    logo: string,
    createdAt: string,
    updatedAt: string
}

export type TagType = {
    id: string,
    __v: number
} & BasicTagType

export type TagDocumentType = BasicTagType & Document;

export type TagModelType = Model<TagDocumentType>;

export type TagFormType = {
    id?: string,
    name?: string,
    logo?: string
}