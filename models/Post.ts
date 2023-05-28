import { models, model, Schema, Types } from 'mongoose';

const PostSchema: Schema = new Schema({
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
        ref: 'Tag'
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
            delete ret.createdAt;
            delete ret.lastUpdatedAt;
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

const Post = models.Post || model('Post', PostSchema, 'posts');

export default Post