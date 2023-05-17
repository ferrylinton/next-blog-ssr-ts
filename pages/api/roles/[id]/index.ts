import type { NextApiRequest, NextApiResponse } from 'next';
import * as roleController from '@/controllers/role-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const method = req.method;

    switch (method) {
        case 'GET':
            await roleController.findOneById(req, res);
            break;

        case 'PUT':
            await roleController.update(req, res);
            break;

        case 'DELETE':
            await roleController.deleteOneById(req, res);
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`${method} Not Allowed`);
            break;
    }

}

export default handler;