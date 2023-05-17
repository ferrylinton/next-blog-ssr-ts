import { NextApiRequest, NextApiResponse } from "next";
import * as authorityService from "@/services/authority-service";
import { CreateAuthorityApiRequest, CreateAuthoritySchema } from "@/validations/authority-schema";

export const find = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const keyword = req.query.keyword as string;
        const page = req.query.page as string;

        const authoritys = await authorityService.find();
        res.status(200).json(authoritys);
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
        const authority = await authorityService.findOneById(id);

        if (authority) {
            res.status(200).json(authority);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (err: any) {
        console.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}

export const save = async (req: CreateAuthorityApiRequest,
    res: NextApiResponse) => {
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
        const authority = await authorityService.update(id as string, req.body);

        if (authority) {
            res.status(200).json({ message: `Data with id=${id} is updated`, authority });
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
        const authority = await authorityService.deleteOneById(id as string);

        if (authority) {
            res.status(200).json({ message: `Data with id=${id} is deleted`, authority });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (err: any) {
        console.error(err);
        const message = err.message;
        res.status(500).send({ message });
    }
}