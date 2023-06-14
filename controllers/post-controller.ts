import * as postService from "@/services/post-service";
import { getLogger } from "@/utils/logger";
import { errorResponse } from "@/utils/response";
import { CreatePostApiRequest, CreatePostSchema } from "@/validations/post-schema";
import { NextApiRequest, NextApiResponse } from "next";

const logger = getLogger('post-controller');

export const find = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const { keyword, page } = req.query;
        const pageable = await postService.find({ keyword, page });
        res.status(200).json(pageable);
    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const findByTag = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id, page } = req.query;
        const pageable = await postService.findByTag({id, page});

        if (pageable) {
            return res.status(200).json(pageable);
        } else {
            return res.status(404).json({ message: `Data with id=${id} is not found` });
        }
    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}


export const findById = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const id = req.query.id as string;
        const post = await postService.findById(id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (error: any) {
        errorResponse(logger, res, error);
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

    } catch (error: any) {
        errorResponse(logger, res, error);
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
    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const deleteById = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const post = await postService.deleteById(id as string);

        if (post) {
            res.status(200).json({ message: `Data with id=${id} is deleted`, post });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}