import { UserDocumentType, UserModelType } from '@/types/user-type';
import bcrypt from 'bcrypt';
import { Schema, Types, model, models } from 'mongoose';


const UserSchema: Schema<UserDocumentType> = new Schema({
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
    },
    role: {
        type: Types.ObjectId,
        required: true,
        ref: 'RoleModel'
    }
}, {
    timestamps: true,
    virtuals: {
        id: {
            get() {
                return this._id ? this._id.toHexString() : '';
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

UserSchema.pre('save', async function (next) {
    this.increment();

    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    next()
});

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const UserModel = models.UserModel || model<UserDocumentType, UserModelType>('UserModel', UserSchema, 'users');

export default UserModel