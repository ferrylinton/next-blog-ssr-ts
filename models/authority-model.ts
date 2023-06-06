import { AuthorityDocumentType, AuthorityModelType } from '@/types/authority-type';
import { Schema, model, models } from 'mongoose';


const AuthoritySchema: Schema<AuthorityDocumentType> = new Schema({
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

const AuthorityModel = models.AuthorityModel || model<AuthorityDocumentType, AuthorityModelType>('AuthorityModel', AuthoritySchema, 'authorities');

export default AuthorityModel