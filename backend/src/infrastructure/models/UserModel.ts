import mongoose, {Schema} from "mongoose";
import { Iuser } from "../../entities/User";

const UserSchema = new Schema<Iuser>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleSignUp;
        },
    },
    role: {
        type: String,
        enum: ['client', 'freelancer', 'admin'],
        default: 'client',
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    googleSignUp: {
        type: Boolean,
        default: false, // Tracks if the user signed up via Google
    },
}, { timestamps: true });

export const UserModel = mongoose.model<Iuser>('User', UserSchema);
