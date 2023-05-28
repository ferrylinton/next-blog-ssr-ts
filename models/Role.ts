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
        ref: 'Authority'
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

const Role: Model<RoleType> = models.Role || model('Role', RoleSchema, 'roles');

export default Role