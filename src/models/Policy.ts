import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const PolicySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    action: { type: String, required: true }, // block, warn, allow
    target: { type: String, required: true }, // agent, mcp, action
    condition: { type: String, default: null }, // e.g. "riskScore > 70"
    enabled: { type: Boolean, default: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

export type IPolicy = InferSchemaType<typeof PolicySchema>;

const Policy: Model<IPolicy> =
  (mongoose.models.Policy as Model<IPolicy>) || mongoose.model<IPolicy>("Policy", PolicySchema);

export default Policy;
