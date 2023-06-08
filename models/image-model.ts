import { ImageDocumentType, ImageModelType } from '@/types/image-type';
import { models, model, Schema } from 'mongoose';


const ImageSchema: Schema<ImageDocumentType> = new Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    imageBuffer: {
        type: Buffer,
        required: true
    },
    imageType: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    virtuals: {
        id: {
            get() {
                return this._id.toHexString();
            }
        },
        url: {
            get() {
                return `${process.env.NEXT_PUBLIC_HOST}/api/images/${this._id.toHexString()}/view`;
            }
        }
    },
    toJSON: {
        virtuals: true,
        versionKey: true,
        transform: function (_doc, ret) {
            delete ret._id;
            delete ret.imageBuffer;
        }
    },
    toObject: {
        virtuals: true
    }
});

ImageSchema.pre('save', function (next) {
    this.increment();
    this.slug = this.slug.toLowerCase();
    return next();
});

const ImageModel = models.ImageModel || model<ImageDocumentType, ImageModelType>('ImageModel', ImageSchema, 'images');

export default ImageModel