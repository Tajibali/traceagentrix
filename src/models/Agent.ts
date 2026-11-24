import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const AgentSchema = new Schema(
  {
    name: { type: String, required: true }, // ChatGPT, Claude, Cursor, etc.
    type: { type: String, required: true }, // desktop, browser, cli, ide
    version: { type: String, default: null },
    status: { type: String, default: "active" }, // active, blocked, warning
    riskLevel: { type: String, default: "low" }, // low, medium, high
    riskScore: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
    tokenUsage: { type: Number, default: 0 },
    deviceId: { type: Schema.Types.ObjectId, ref: "Device", default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

export type IAgent = InferSchemaType<typeof AgentSchema>;

const Agent: Model<IAgent> =
  (mongoose.models.Agent as Model<IAgent>) || mongoose.model<IAgent>("Agent", AgentSchema);

export default Agent;
