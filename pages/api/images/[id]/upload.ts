import type { NextApiRequest, NextApiResponse } from 'next';
import * as imageController from '@/controllers/image-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const method = req.method;

    switch (method) {
        case 'PUT':
            await imageController.update(req, res);
            break;
        default:
            res.setHeader('Allow', ['PUT']);
            res.status(405).end(`${method} Not Allowed`);
            break;
    }

}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;