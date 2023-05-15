
import type { NextApiRequest, NextApiResponse } from 'next';
import * as tagController from '@/controllers/tag-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    if (req.method === 'GET') {
        await tagController.find(req, res);
    } else if (req.method === 'POST') {
        await tagController.save(req, res);
    } else {
        res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;