import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const DeviceSchema = new Schema(
  {
    name: { type: String, required: true },
    hostname: { type: String, default: null },
    os: { type: String, required: true }, // Windows, macOS, Linux
    status: { type: String, default: "online" }, // online, offline, warning
    lastSeen: { type: Date, default: Date.now },
    ipAddress: { type: String, default: null },
    agentCount: { type: Number, default: 0 },
    riskScore: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

export type IDevice = InferSchemaType<typeof DeviceSchema>;

const Device: Model<IDevice> =
  (mongoose.models.Device as Model<IDevice>) || mongoose.model<IDevice>("Device", DeviceSchema);

export default Device;
