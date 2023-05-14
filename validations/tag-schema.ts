import { NextApiRequest } from "next";
import { object, string, TypeOf, z } from "zod";

export const TagSchema = object({
    name: string({required_error: "name is required"})
        .min(3, { message: "name min 3 chars and max 50 chars" })
        .max(50, { message: "name min 3 chars and max 50 chars" }),
});

export interface TagApiRequest extends NextApiRequest {
    body: TypeOf<typeof TagSchema>;
}

export type TagType = z.infer <typeof TagSchema>;

export type TagFormType = {
    id?: string 
} & TagType;