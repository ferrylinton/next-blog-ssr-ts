import { NextApiRequest } from "next";
import { object, string, TypeOf, z } from "zod";

export const CreateAuthoritySchema = object({
    id: string().optional(),
    name: string({required_error: "name is required"})
        .min(3, { message: "name min 3 chars and max 50 chars" })
        .max(50, { message: "name min 3 chars and max 50 chars" }),
});

export interface CreateAuthorityApiRequest extends NextApiRequest {
    body: TypeOf<typeof CreateAuthoritySchema>;
}