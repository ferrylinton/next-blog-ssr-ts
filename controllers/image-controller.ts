import ImageModel from '@/models/image-model';
import * as imageService from '@/services/image-service';
import { getLogger } from '@/utils/logger';
import { errorResponse, errorValidation } from '@/utils/response';
import { checkImageUploadDir, deleteFile, imageFormidable } from '@/utils/upload';
import { CreateImageApiRequest } from '@/validations/image-schema';
import formidable from 'formidable';
import imageToBase64 from 'image-to-base64';
import { NextApiRequest, NextApiResponse } from 'next';


const logger = getLogger('image-controller');

export const find = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { keyword, page } = req.query;
        const pageable = await imageService.find({ keyword, page });
        res.status(200).json(pageable);
    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const findById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.query.id as string;
        const image = await imageService.findById(id);

        if (image) {
            res.status(200).json(image);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }
    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const viewById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.query.id as string;
        const image = await imageService.findById(id);

        if (image) {
            const buffer = Buffer.from(image.imageBuffer, 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': buffer.length
            });
            res.end(buffer);
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }
    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}

export const save = async (req: CreateImageApiRequest, res: NextApiResponse) => {
    try {
        checkImageUploadDir();
        const form = imageFormidable();

        form.parse(req, async (err, fields, files) => {
            const file = files.file as formidable.File;

            if (err) {
                logger.error(err);
                res.status(400).json({ message: String(err) });
            } else {
                try {
                    const imageType = file.mimetype;
                    const slug = fields.slug as string;
                    const imageContent = await imageToBase64(file.filepath);
                    const imageBuffer = Buffer.from(imageContent, 'base64');
                    const image = await imageService.save({ slug, imageBuffer, imageType });

                    deleteFile(file.filepath);
                    return res.status(200).json(image.toJSON());
                } catch (error) {
                    logger.error(error);
                    return res.status(500).send(error);
                }
            }
        });
    } catch (error: any) {
        errorValidation(logger, res, error);
    }
}

export const update = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        checkImageUploadDir();
        const form = imageFormidable();

        form.parse(req, async (err, fields, files) => {
            const file = files.file as formidable.File;

            if (err) {
                logger.error(err);
                res.status(400).json({ message: String(err) });
            } else {
                try {
                    let imageBuffer = null;
                    let imageType = null;

                    if(file){
                        imageType = file.mimetype;
                        const imageContent = await imageToBase64(file.filepath);
                        imageBuffer = Buffer.from(imageContent, 'base64');
                    }
                    
                    const slug = fields.slug as string;
                    const { id } = req.query;
                    const image = await imageService.update(id as string, { slug, imageBuffer, imageType });

                    if (image) {
                        
                        if(file){
                            deleteFile(file.filepath);
                        }

                        return res.status(200).json(image);
                    } else {
                        return res.status(404).json({ message: `Data with id=${id} is not found` });
                    }
                } catch (error) {
                    logger.error(error);
                    return res.status(500).send(error);
                }
            }
        });
    } catch (error: any) {
        errorValidation(logger, res, error);
    }
}

export const deleteById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const image = await imageService.deleteById(id as string);

        if (image) {
            res.status(200).json({ message: `Data with id=${id} is deleted`, image });
        } else {
            res.status(404).json({ message: `Data with id=${id} is not found` });
        }

    } catch (error: any) {
        errorResponse(logger, res, error);
    }
}