
import type { NextApiRequest, NextApiResponse } from 'next';
import * as roleController from '@/controllers/role-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    if (req.method === 'GET') {
        await roleController.find(req, res);
    } else if (req.method === 'POST') {
        await roleController.save(req, res);
    } else {
        res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;