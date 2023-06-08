
import type { NextApiRequest, NextApiResponse } from 'next';
import * as imageController from '@/controllers/image-controller';


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    if (req.method === 'GET') {
        await imageController.find(req, res);
    } else {
        res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;