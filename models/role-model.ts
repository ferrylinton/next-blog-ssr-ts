import { models, model, Schema, Types, Model } from 'mongoose';

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