
import type { NextApiRequest, NextApiResponse } from 'next';
import * as userController from '@/controllers/user-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    if (req.method === 'GET') {
        await userController.find(req, res);
    } else if (req.method === 'POST') {
        await userController.save(req, res);
    } else {
        res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;