import { NextApiRequest, NextApiResponse } from "next";
import * as userService from "@/services/user-service";
import { CreateUserApiRequest, CreateUserSchema } from "@/validations/user-schema";
import { getLogger } from "@/utils/logger";
import { errorResponse, errorValidation } from "@/utils/response";

const logger = getLogger('user-controller');

export const find = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const keyword = req.query.keyword as string;
        const page = req.query.page as string;

        const users = await userService.find();
        res.status(200).json(users);
    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const findById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.query.id as string;
        const user = await userService.findById(id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const save = async (req: CreateUserApiRequest,
    res: NextApiResponse) => {
    try {
        const result = CreateUserSchema.safeParse(req.body);

        if (result.success) {
            const authority = await userService.save(req.body);
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

export const update = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const user = await userService.update(id as string, req.body);

        if (user) {
            res.status(200).json({ message: `Data with id=${id} is updated`, user });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }
    } catch (error: any) {
        errorValidation(logger, res, error);
    }
}

export const deleteById = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const user = await userService.deleteById(id as string);

        if (user) {
            res.status(200).json({ message: `Data with id=${id} is deleted`, user });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}