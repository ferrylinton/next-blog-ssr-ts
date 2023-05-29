import { NextApiRequest } from "next";
import { object, string, TypeOf, z } from "zod";

export const CreatePostSchema = object({
    id: string().optional(),
    slug: string({ required_error: "slug is required" })
        .min(3, { message: "slug min 3 chars and max 50 chars" })
        .max(50, { message: "slug min 3 chars and max 50 chars" }),
    title: string({ required_error: "title is required" })
        .min(3, { message: "title min 3 chars and max 50 chars" })
        .max(150, { message: "title min 3 chars and max 50 chars" }),
    description: string({ required_error: "description is required" })
        .min(3, { message: "description min 3 chars and max 50 chars" })
        .max(250, { message: "description min 3 chars and max 50 chars" }),
    content: string({ required_error: "content is required" })
        .min(3, { message: "content min 3 chars and max 50 chars" })
        .max(250, { message: "content min 3 chars and max 50 chars" }),
    tags: z.array(z.string({ required_error: "tag is required" })),
});

export interface CreatePostApiRequest extends NextApiRequest {
    body: TypeOf<typeof CreatePostSchema>;
}

export type CreatePostType = z.infer<typeof CreatePostSchema>;
