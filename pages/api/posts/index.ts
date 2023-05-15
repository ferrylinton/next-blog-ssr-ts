
import type { NextApiRequest, NextApiResponse } from 'next';
import * as postController from '@/controllers/post-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    if (req.method === 'GET') {
        await postController.find(req, res);
    } else if (req.method === 'POST') {
        await postController.save(req, res);
    } else {
        res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;