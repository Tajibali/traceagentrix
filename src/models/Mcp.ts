import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const McpSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    status: { type: String, default: "active" }, // active, quarantined, blocked
    riskLevel: { type: String, default: "low" },
    riskScore: { type: Number, default: 0 },
    permissions: { type: [String], default: [] }, // read, write, delete, etc.
    source: { type: String, default: null }, // local, remote
    agentId: { type: Schema.Types.ObjectId, ref: "Agent", default: null },
    deviceId: { type: Schema.Types.ObjectId, ref: "Device", default: null },
  },
  { timestamps: true }
);

export type IMcp = InferSchemaType<typeof McpSchema>;

const Mcp: Model<IMcp> =
  (mongoose.models.Mcp as Model<IMcp>) || mongoose.model<IMcp>("Mcp", McpSchema);

export default Mcp;
