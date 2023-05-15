import { NextApiRequest, NextApiResponse } from "next";
import * as postService from "@/services/post-service";
import { CreatePostApiRequest, CreatePostSchema } from "@/validations/post-schema";

export const find = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const keyword = req.query.keyword as string;
        const page = req.query.page as string;

        const posts = await postService.find();
        res.status(200).json(posts);
    } catch (err: any) {
        console.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}

export const findOneById = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const id = req.query.id as string;
        const post = await postService.findOneById(id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (err: any) {
        console.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}

export const save = async (req: CreatePostApiRequest,
    res: NextApiResponse) => {
    try {
        const result = CreatePostSchema.safeParse(req.body);

        if (result.success) {
            const authority = await postService.save(req.body);
            res.status(200).json(authority);
        } else {
            const code = 400;
            const errors = result.error.errors.map(message => {
                return message.message;
            });

            res.status(400).send({ code, errors });
        }

    } catch (err: any) {
        console.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}

export const update = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const post = await postService.update(id as string, req.body);

        if (post) {
            res.status(200).json({ message: `Data with id=${id} is updated`, post });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }
    } catch (err: any) {
        console.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}

export const deleteOneById = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const post = await postService.deleteOneById(id as string);

        if (post) {
            res.status(200).json({ message: `Data with id=${id} is deleted`, post });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (err: any) {
        console.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}