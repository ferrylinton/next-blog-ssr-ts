import type { NextApiRequest, NextApiResponse } from 'next';
import * as postController from '@/controllers/post-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    
    const method = req.method;

    switch (method) {
        case 'GET':
            await postController.findByTag(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`${method} Not Allowed`);
            break;
    }

}

export default handler;