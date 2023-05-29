import { NextApiRequest, NextApiResponse } from "next";
import * as tagService from "@/services/tag-service";
import { CreateTagApiRequest, CreateTagSchema } from "@/validations/tag-schema";
import { getLogger } from "@/utils/logger";
import { DuplicationError } from "@/errors/DuplicationError";

const logger = getLogger("TagController");

export const find = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const tags = await tagService.findAllJson();
        res.status(200).json(tags);
    } catch (err: any) {
        logger.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}

export const findOneById = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const id = req.query.id as string;
        const tag = await tagService.findOneById(id);

        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (err: any) {
        logger.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}

export const save = async (req: CreateTagApiRequest,
    res: NextApiResponse) => {
    try {
        const result = CreateTagSchema.safeParse(req.body);

        if (result.success) {
            const authority = await tagService.save(result.data);
            res.status(200).json(authority);
        } else {
            const code = 400;
            const errors = result.error.errors.map(message => {
                return message.message;
            });

            res.status(400).send({ code, errors });
        }

    } catch (err: any) {
        logger.error(err);
        const message = err.message;

        if(err instanceof DuplicationError){
            res.status(400).send({ message });
        }else{
            res.status(500).send({ message });
        }
    }
}

export const update = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const tag = await tagService.update(id as string, req.body);

        if (tag) {
            res.status(200).json({ message: `Data with id=${id} is updated`, tag });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }
    } catch (err: any) {
        logger.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}

export const deleteOneById = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const tag = await tagService.deleteOneById(id as string);

        if (tag) {
            res.status(200).json({ message: `Data with id=${id} is deleted`, tag });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (err: any) {
        logger.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}