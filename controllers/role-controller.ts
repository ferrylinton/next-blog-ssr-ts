import { NextApiRequest, NextApiResponse } from "next";
import * as roleService from "@/services/role-service";
import { CreateRoleApiRequest, CreateRoleSchema } from "@/validations/role-schema";

export const find = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const keyword = req.query.keyword as string;
        const page = req.query.page as string;

        const roles = await roleService.find();
        res.status(200).json(roles);
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
        const role = await roleService.findOneById(id);

        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (err: any) {
        console.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}

export const save = async (req: CreateRoleApiRequest,
    res: NextApiResponse) => {
    try {
        const result = CreateRoleSchema.safeParse(req.body);

        if (result.success) {
            const role = await roleService.save(req.body);
            res.status(200).json(role);
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
        const role = await roleService.update(id as string, req.body);

        if (role) {
            res.status(200).json({ message: `Data with id=${id} is updated`, role });
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
        const role = await roleService.deleteOneById(id as string);

        if (role) {
            res.status(200).json({ message: `Data with id=${id} is deleted`, role });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (err: any) {
        console.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}