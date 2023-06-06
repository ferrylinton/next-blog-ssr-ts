import { RoleDocumentType, RoleModelType } from '@/types/role-type';
import { Schema, Types, model, models } from 'mongoose';


const RoleSchema: Schema<RoleDocumentType> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    authorities: [{
        type: Types.ObjectId,
        required: true,
        ref: 'AuthorityModel'
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
        transform: function (_doc, ret) {
            delete ret._id;
        }
    },
    toObject: {
        virtuals: true
    }
});

RoleSchema.pre('save', function (next) {
    this.increment();
    this.name = this.name.toUpperCase();
    return next();
});

const RoleModel = models.RoleModel || model<RoleDocumentType, RoleModelType>('RoleModel', RoleSchema, 'roles');

export default RoleModel