import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, default: null },
    company: { type: String, default: null },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export type IUser = InferSchemaType<typeof UserSchema>;

const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

export default User;
