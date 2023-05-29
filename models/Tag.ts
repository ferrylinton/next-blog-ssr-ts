import { DuplicationError } from '@/errors/DuplicationError';
import { models, model, Schema, Model } from 'mongoose';

const TagSchema: Schema = new Schema({
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
        versionKey: false,
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
    return next();
});

TagSchema.post('save', function (error: any, _doc: any, next: any) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new DuplicationError());
    } else {
        next();
    }
});

TagSchema.post('updateOne', function (error: any, _doc: any, next: any) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new DuplicationError());
    } else {
        next();
    }
});

const Tag: Model<TagType> = models.Tag || model('Tag', TagSchema, 'tags');

export default Tag