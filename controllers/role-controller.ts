import { NextApiRequest, NextApiResponse } from "next";
import * as roleService from "@/services/role-service";
import { CreateRoleApiRequest, CreateRoleSchema } from "@/validations/role-schema";
import { getLogger } from "@/utils/logger";
import { errorResponse, errorValidation } from "@/utils/response";

const logger = getLogger('role-controller');

export const find = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const keyword = req.query.keyword as string;
        const page = req.query.page as string;

        const roles = await roleService.find();
        res.status(200).json(roles);
    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const findById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.query.id as string;
        const role = await roleService.findById(id);

        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const save = async (req: CreateRoleApiRequest, res: NextApiResponse) => {
    try {
        const result = CreateRoleSchema.safeParse(req.body);

        if (result.success) {
            const role = await roleService.save(result.data);
            res.status(200).json(role);
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
        const role = await roleService.update(id as string, req.body);

        if (role) {
            res.status(200).json({ message: `Data with id=${id} is updated`, role });
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
        const role = await roleService.deleteById(id as string);

        if (role) {
            res.status(200).json({ message: `Data with id=${id} is deleted`, role });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}