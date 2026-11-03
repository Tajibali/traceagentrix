import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const AlertSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    severity: { type: String, required: true }, // low, medium, high, critical
    status: { type: String, default: "open" }, // open, acknowledged, resolved
    source: { type: String, default: null }, // agent name or mcp name
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

export type IAlert = InferSchemaType<typeof AlertSchema>;

const Alert: Model<IAlert> =
  (mongoose.models.Alert as Model<IAlert>) || mongoose.model<IAlert>("Alert", AlertSchema);

export default Alert;
