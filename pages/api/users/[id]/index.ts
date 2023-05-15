import type { NextApiRequest, NextApiResponse } from 'next';
import * as userController from '@/controllers/user-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const method = req.method;

    switch (method) {
        case 'GET':
            await userController.findOneById(req, res);
            break;

        case 'PUT':
            await userController.update(req, res);
            break;

        case 'DELETE':
            await userController.deleteOneById(req, res);
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`${method} Not Allowed`);
            break;
    }

}

export default handler;