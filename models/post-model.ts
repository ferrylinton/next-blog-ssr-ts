import { PostDocumentType, PostModelType } from '@/types/post-type';
import { models, model, Schema, Types } from 'mongoose';


const PostSchema: Schema<PostDocumentType> = new Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [{
        type: Types.ObjectId,
        ref: 'TagModel',
        required: true
    }]
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
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
        }
    },
    toObject: {
        virtuals: true
    }
});

PostSchema.pre('save', function (next) {
    this.increment();
    return next();
});

const PostModel = models.PostModel || model<PostDocumentType, PostModelType>('PostModel', PostSchema, 'posts');

export default PostModel