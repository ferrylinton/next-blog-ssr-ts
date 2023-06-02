import { NextApiRequest } from "next";
import {  object, string, TypeOf, z } from "zod";

export const CreateRoleSchema = object({
    id: string().optional(),
    name: string({ required_error: "name is required" })
        .min(3, { message: "name min 3 chars and max 50 chars" })
        .max(50, { message: "name min 3 chars and max 50 chars" }),
    authorities: string().array().nonempty({
        message: "authorities can't be empty",
    })
});

export interface CreateRoleApiRequest extends NextApiRequest {
    body: TypeOf<typeof CreateRoleSchema>;
}
