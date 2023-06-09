import type { NextApiRequest, NextApiResponse } from 'next';
import * as imageController from '@/controllers/image-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const method = req.method;

    switch (method) {
        case 'GET':
            await imageController.findById(req, res);
            break;

        case 'DELETE':
            await imageController.deleteById(req, res);
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`${method} Not Allowed`);
            break;
    }

}

export const config = {
    api: {
        responseLimit: false,
    },
}

export default handler;