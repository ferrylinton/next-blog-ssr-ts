
import type { NextApiRequest, NextApiResponse } from 'next';
import * as authorityController from '@/controllers/authority-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    if (req.method === 'GET') {
        await authorityController.find(req, res);
    } else if (req.method === 'POST') {
        await authorityController.save(req, res);
    } else {
        res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;