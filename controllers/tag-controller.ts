import { NextApiRequest, NextApiResponse } from 'next';
import * as tagService from '@/services/tag-service';
import { CreateTagApiRequest, CreateTagSchema } from '@/validations/tag-schema';
import { getLogger } from '@/utils/logger';
import { errorResponse, errorValidation } from '@/utils/response';

const logger = getLogger('tag-controller');

export const find = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { keyword, page } = req.query;
        const pageable = await tagService.find({ keyword, page });
        res.status(200).json(pageable);
    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const findById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.query.id as string;
        const tag = await tagService.findById(id);

        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }
    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const save = async (req: CreateTagApiRequest, res: NextApiResponse) => {
    try {
        const result = CreateTagSchema.safeParse(req.body);

        if (result.success) {
            const tag = await tagService.save(result.data);
            res.status(200).json(tag);
        } else {
            const code = 400;
            const errors = result.error.errors.map(message => {
                return message.message;
            });

            res.status(400).send({ code, errors });
        }
    } catch (error: any) {
        errorValidation(logger, res, error);
    }
}

export const update = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const tag = await tagService.update(id as string, req.body);

        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }
    } catch (error: any) {
        errorValidation(logger, res, error);
    }
}

export const deleteById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const tag = await tagService.deleteById(id as string);

        if (tag) {
            res.status(200).json({ message: `Data with id=${id} is deleted`, tag });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}