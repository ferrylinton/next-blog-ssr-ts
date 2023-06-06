import { TagDocumentType, TagModelType } from '@/types/tag-type';
import { models, model, Schema } from 'mongoose';


const TagSchema: Schema<TagDocumentType> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {
    timestamps: true,
    virtuals: {
        id: {
            get() {
                return this._id.toHexString();
            }
        }
    },
    toJSON: {
        virtuals: true,
        versionKey: true,
        transform: function (_doc, ret) {
            delete ret._id;
        }
    },
    toObject: {
        virtuals: true
    }
});

TagSchema.pre('save', function (next) {
    this.increment();
    this.name = this.name.toUpperCase();
    return next();
});

const TagModel = models.TagModel || model<TagDocumentType, TagModelType>('TagModel', TagSchema, 'tags');

export default TagModel