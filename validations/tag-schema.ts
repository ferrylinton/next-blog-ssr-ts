import { NextApiRequest } from "next";
import { object, string, TypeOf } from "zod";
import isSvg from 'is-svg';

export const CreateTagSchema = object({
    name: string({ required_error: "name is required" })
        .min(3, { message: "name min 3 chars and max 50 chars" })
        .max(50, { message: "name min 3 chars and max 50 chars" }),
    logo: string({ required_error: "logo is required" })
        .nonempty({ message: "logo is required" })
        .refine(isSvg, "logo is not a valid svg")
});

export interface CreateTagApiRequest extends NextApiRequest {
    body: TypeOf<typeof CreateTagSchema>;
}
