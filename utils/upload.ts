import * as dateFn from "date-fns";
import formidable from "formidable";
import fs from 'fs';
import { mkdir, stat } from "fs/promises";
import mime from "mime";
import { join } from "path";
import { getLogger } from "./logger";

const logger = getLogger('upload');

export const ImageUploadDir = join(process.env.ROOT_DIR || process.cwd(), `/uploads/images/${dateFn.format(Date.now(), "dd-MM-Y")}`);

export const checkImageUploadDir = async () => {
    try {
        await stat(ImageUploadDir);
    } catch (e: any) {
        if (e.code === "ENOENT") {
            await mkdir(ImageUploadDir, { recursive: true });
        } else {
            throw e;
        }
    }
}

export const deleteFile = (path: string) => {
    try {
        fs.unlinkSync(path);
    } catch (error: any) {
        logger.error(error);
    }
}

export const imageFormidable = () => {
    return formidable({
        maxFiles: 10,
        maxFileSize: 1024 * 1024 * 10, // 10mb
        uploadDir: ImageUploadDir,
        filename: (_name, _ext, part) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const filename = `${part.name || "unknown"}-${uniqueSuffix}.${mime.getExtension(part.mimetype || "") || "unknown"}`;
            return filename;
        },
        filter: (part) => {
            return (
                part.name === "file" && (part.mimetype?.includes("image") || false)
            );
        }
    })
};
