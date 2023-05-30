import { NextApiResponse } from "next";
import { Logger } from "pino";

export function errorResponse(logger: Logger, res: NextApiResponse, error: any) {
    logger.error(error);
    const message = error.message;
    res.status(500).send({ message });
}

export function errorValidation(logger: Logger, res: NextApiResponse, error: any) {
    logger.error(error);
    const message = error.message;

    if (error.name === 'MongoServerError' && error.code === 11000) {
        res.status(400).send({ message });
    } else {
        res.status(500).send({ message });
    }
}