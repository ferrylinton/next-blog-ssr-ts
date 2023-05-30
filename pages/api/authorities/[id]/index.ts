import type { NextApiRequest, NextApiResponse } from 'next';
import * as authorityController from '@/controllers/authority-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const method = req.method;

    switch (method) {
        case 'GET':
            await authorityController.findById(req, res);
            break;

        case 'PUT':
            await authorityController.update(req, res);
            break;

        case 'DELETE':
            await authorityController.deleteById(req, res);
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`${method} Not Allowed`);
            break;
    }

}

export default handler;