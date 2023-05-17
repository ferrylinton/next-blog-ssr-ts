import { NextApiRequest } from "next";
import { array, object, string, TypeOf, z } from "zod";
import { CreateAuthoritySchema } from "./authority-schema";

export const CreateRoleSchema = object({
    name: string({required_error: "name is required"})
        .min(3, { message: "name min 3 chars and max 50 chars" })
        .max(50, { message: "name min 3 chars and max 50 chars" }),
    authorities: array(string())
});

export interface CreateRoleApiRequest extends NextApiRequest {
    body: TypeOf<typeof CreateRoleSchema>;
}

export type CreateRoleType = z.infer <typeof CreateRoleSchema>;