import { models, model, Schema, Types } from 'mongoose';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    loginAttempt: {
        type: Number, 
        required: true, 
        default: 0
    },
    activated: {
        type: Boolean,
        required: true,
        default: false
    },
    locked: {
        type: Boolean,
        required: true,
        default: false
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

const User = models.User || model('User', UserSchema, 'users');

export default User