import { Document, models, model, Schema, Types, Model } from 'mongoose';

export type IRole = {
    name: string,
    createdAt: string,
    updatedAt: string
}

export type IRoleType = {
    id: string,
    __v: number
} & IRole

export type IRoleDocument = IRole & Document

export interface IRoleModel extends Model<IRoleDocument> { }

const RoleSchema: Schema = new Schema({
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
    return next();
});

const RoleModel: Model<RoleType> = models.RoleModel || model('RoleModel', RoleSchema, 'roles');

export default RoleModel