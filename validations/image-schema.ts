import { NextApiRequest } from "next";
import { any, object, string, TypeOf, z } from "zod";

export const CreateImageSchema = object({
    slug: string({ required_error: "slug is required" })
        .min(3, { message: "slug min 3 chars and max 50 chars" })
        .max(50, { message: "slug min 3 chars and max 50 chars" }),
    file: any().optional()
});

export interface CreateImageApiRequest extends NextApiRequest {
    body: TypeOf<typeof CreateImageSchema>;
}
