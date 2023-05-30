import { NextApiRequest, NextApiResponse } from 'next';
import * as authorityService from '@/services/authority-service';
import { CreateAuthorityApiRequest, CreateAuthoritySchema } from '@/validations/authority-schema';
import { getLogger } from '@/utils/logger';
import { errorResponse, errorValidation } from '@/utils/response';

const logger = getLogger('authority-controller');

export const find = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const keyword = req.query.keyword as string;
        const page = req.query.page as string;

        const authoritys = await authorityService.find();
        res.status(200).json(authoritys);
    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const findById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.query.id as string;
        const authority = await authorityService.findById(id);

        if (authority) {
            res.status(200).json(authority);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const save = async (req: CreateAuthorityApiRequest, res: NextApiResponse) => {
    try {
        const result = CreateAuthoritySchema.safeParse(req.body);

        if (result.success) {
            const authority = await authorityService.save(req.body);
            res.status(200).json(authority);
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
        const authority = await authorityService.update(id as string, req.body);

        if (authority) {
            res.status(200).json({authority });
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
        const authority = await authorityService.deleteById(id as string);

        if (authority) {
            res.status(200).json({ message: `Data with id=${id} is deleted`, authority });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}