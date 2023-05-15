import type { NextApiRequest, NextApiResponse } from 'next';
import * as postController from '@/controllers/post-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const method = req.method;

    switch (method) {
        case 'GET':
            await postController.findOneById(req, res);
            break;

        case 'PUT':
            await postController.update(req, res);
            break;

        case 'DELETE':
            await postController.deleteOneById(req, res);
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`${method} Not Allowed`);
            break;
    }

}

export default handler;