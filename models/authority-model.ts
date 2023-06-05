import { Document, models, model, Schema, Model } from 'mongoose';

export interface IAuthority {
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface IAuthorityType extends IAuthority{
    id: string,
    __v: number
}

export interface IAuthorityDocument extends IAuthority, Document { }

export interface IAuthorityModel extends Model<IAuthorityDocument> { }

const AuthoritySchema: Schema<IAuthorityDocument> = new Schema({
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
    this.name = this.name.toUpperCase();
    return next();
});

const AuthorityModel = models.AuthorityModel || model<IAuthorityDocument, IAuthorityModel>('AuthorityModel', AuthoritySchema, 'authorities');

export default AuthorityModel