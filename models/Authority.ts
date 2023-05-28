import { models, model, Schema, Model } from 'mongoose';

const AuthoritySchema: Schema = new Schema({
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
            ret.createdAt = ret.createdAt.toISOString();
            ret.updatedAt = ret.updatedAt.toISOString()
        }
    },
    toObject: {
        virtuals: true
    }
});

AuthoritySchema.pre('save', function (next) {
    this.increment();
    return next();
});

const Authority: Model<AuthorityType> = models.Authority || model('Authority', AuthoritySchema, 'authorities');

export default Authority