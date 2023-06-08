import { Document, Model } from 'mongoose';


export type BasicImageType = {
    slug: string,
    imageBuffer: Buffer,
    imageType: String
    createdAt: string,
    updatedAt: string
}

export type ImageType = {
    id: string,
    __v: number
} & BasicImageType

export type ImageDocumentType = BasicImageType & Document;

export type ImageModelType = Model<ImageDocumentType>;

export type ImageFormType = {
    id?: string,
    slug?: string,
    file?: any
}