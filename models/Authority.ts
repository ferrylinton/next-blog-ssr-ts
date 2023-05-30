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
        versionKey: true,
        transform: function (_doc, ret) {
            delete ret._id;
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