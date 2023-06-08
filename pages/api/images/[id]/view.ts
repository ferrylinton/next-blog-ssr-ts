import type { NextApiRequest, NextApiResponse } from 'next';
import * as imageController from '@/controllers/image-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const method = req.method;

    switch (method) {
        case 'GET':
            await imageController.viewById(req, res);
            break;

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`${method} Not Allowed`);
            break;
    }

}

export default handler;