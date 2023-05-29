import { models, model, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

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
    },
    role: {
        type: Types.ObjectId,
        ref: 'Role'
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

UserSchema.post('save', function (error: any, _doc: any, next: any) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error(`Duplicate data`));
    } else {
        next();
    }
});

UserSchema.post('updateOne', function (error: any, _doc: any, next: any) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error(`Duplicate data`));
    } else {
        next();
    }
});

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = models.User || model('User', UserSchema, 'users');

export default User