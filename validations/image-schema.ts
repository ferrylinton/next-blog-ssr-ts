import { NextApiRequest } from "next";
import { any, object, string, TypeOf, z } from "zod";

export const CreateImageSchema = object({
    slug: string({ required_error: "slug is required" })
        .min(3, { message: "slug min 3 chars and max 50 chars" })
        .max(50, { message: "slug min 3 chars and max 50 chars" }),
    file: any()
            .refine((files) => files?.[0]?.size > 1000, `Min image size is 1kb.`)
            .refine((files) => files?.[0]?.size <= 500000, `Max image size is 5MB.`)
});

export const UpdateImageSchema = object({
    slug: string({ required_error: "slug is required" })
        .min(3, { message: "slug min 3 chars and max 50 chars" })
        .max(50, { message: "slug min 3 chars and max 50 chars" }),
    file: any()
});

export interface CreateImageApiRequest extends NextApiRequest {
    body: TypeOf<typeof CreateImageSchema>;
}

export interface UpdateImageApiRequest extends NextApiRequest {
    body: TypeOf<typeof UpdateImageSchema>;
}

