import type { NextApiRequest, NextApiResponse } from 'next';
import * as tagController from '@/controllers/tag-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const method = req.method;

    switch (method) {
        case 'GET':
            await tagController.findOneById(req, res);
            break;

        case 'PUT':
            await tagController.update(req, res);
            break;

        case 'DELETE':
            await tagController.deleteOneById(req, res);
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`${method} Not Allowed`);
            break;
    }

}

export default handler;