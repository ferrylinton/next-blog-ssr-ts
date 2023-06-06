import { Document, Model } from 'mongoose';


export type BasicPostType = {
    slug: string,
    title: string,
    description: string,
    content: string,
    tags: any
}

export type PostType = {
    id: string,
    __v: number
} & BasicPostType

export type PostDocumentType = BasicPostType & Document;

export type PostModelType = Model<PostDocumentType>;

export type PostFormType = {
    id?: string,
    slug: string,
    title: string,
    description: string,
    content: string,
    tags: String[],
    allTags: string[]
}