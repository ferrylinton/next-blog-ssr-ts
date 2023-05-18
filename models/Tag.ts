import { models, model, Schema, Types, Model } from 'mongoose';



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
        transform: function (doc, ret) {
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

const Tag: Model<TagType> = models.Tag || model('Tag', TagSchema, 'tags');

export default Tag