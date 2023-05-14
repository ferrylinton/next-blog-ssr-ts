import { NextApiRequest } from "next";
import { object, string, TypeOf, z } from "zod";

export const authoritySchema = object({
    name: string({required_error: "name is required"})
        .min(3, { message: "name min 3 chars and max 50 chars" })
        .max(50, { message: "name min 3 chars and max 50 chars" }),
});

export interface AuthorityApiRequest extends NextApiRequest {
    body: TypeOf<typeof authoritySchema>;
}

export type AuthorityType = z.infer <typeof authoritySchema>;