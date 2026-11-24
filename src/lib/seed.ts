import Agent from "@/models/Agent";
import Mcp from "@/models/Mcp";
import Device from "@/models/Device";
import Policy from "@/models/Policy";
import Alert from "@/models/Alert";

export async function seedUserDataIfEmpty(userId: string) {
  const existingAgents = await Agent.countDocuments({ userId });
  const existingDevices = await Device.countDocuments({ userId });
  const existingMcps = await Mcp.countDocuments({ userId });
  const existingPolicies = await Policy.countDocuments({ userId });
  const existingAlerts = await Alert.countDocuments({ userId });

  if (
    existingAgents > 0 ||
    existingDevices > 0 ||
    existingMcps > 0 ||
    existingPolicies > 0 ||
    existingAlerts > 0
  ) {
    return { seeded: false };
  }

  const devices = await Device.insertMany([
    {
      name: "MacBook Pro – Sarah",
      hostname: "sarah-mbp.local",
      os: "macOS",
      status: "online",
      agentCount: 8,
      riskScore: 22,
      ipAddress: "192.168.1.42",
      lastSeen: new Date(),
      userId,
    },
    {
      name: "Dev Workstation – Ali",
      hostname: "ali-win-01",
      os: "Windows",
      status: "online",
      agentCount: 12,
      riskScore: 67,
      ipAddress: "192.168.1.88",
      lastSeen: new Date(Date.now() - 2 * 60 * 1000),
      userId,
    },
    {
      name: "MacBook Air – Engineering",
      hostname: "eng-mba-03",
      os: "macOS",
      status: "online",
      agentCount: 5,
      riskScore: 15,
      ipAddress: "192.168.1.104",
      lastSeen: new Date(Date.now() - 5 * 60 * 1000),
      userId,
    },
    {
      name: "Laptop – Finance",
      hostname: "fin-lt-07",
      os: "Windows",
      status: "offline",
      agentCount: 3,
      riskScore: 41,
      ipAddress: "192.168.1.119",
      lastSeen: new Date(Date.now() - 3 * 60 * 60 * 1000),
      userId,
    },
    {
      name: "Mac Mini – CI Runner",
      hostname: "ci-mac-01",
      os: "macOS",
      status: "warning",
      agentCount: 6,
      riskScore: 78,
      ipAddress: "192.168.1.201",
      lastSeen: new Date(Date.now() - 12 * 60 * 1000),
      userId,
    },
  ]);

  const agents = await Agent.insertMany([
    {
      name: "Claude Code",
      type: "cli",
      status: "active",
      riskLevel: "medium",
      riskScore: 58,
      tokenUsage: 2400000,
      deviceId: devices[1]._id,
      lastActive: new Date(Date.now() - 2 * 60 * 1000),
      version: "1.2.0",
      userId,
    },
    {
      name: "Cursor",
      type: "ide",
      status: "active",
      riskLevel: "low",
      riskScore: 22,
      tokenUsage: 1800000,
      deviceId: devices[0]._id,
      lastActive: new Date(Date.now() - 5 * 60 * 1000),
      version: "0.42.1",
      userId,
    },
    {
      name: "ChatGPT",
      type: "desktop",
      status: "active",
      riskLevel: "low",
      riskScore: 18,
      tokenUsage: 980000,
      deviceId: devices[2]._id,
      lastActive: new Date(Date.now() - 60 * 1000),
      version: "1.2024.11",
      userId,
    },
    {
      name: "GitHub Copilot",
      type: "ide",
      status: "active",
      riskLevel: "low",
      riskScore: 12,
      tokenUsage: 720000,
      deviceId: devices[0]._id,
      lastActive: new Date(Date.now() - 8 * 60 * 1000),
      version: "1.234.0",
      userId,
    },
    {
      name: "Claude",
      type: "browser",
      status: "warning",
      riskLevel: "high",
      riskScore: 81,
      tokenUsage: 450000,
      deviceId: devices[4]._id,
      lastActive: new Date(Date.now() - 12 * 60 * 1000),
      version: "web",
      userId,
    },
    {
      name: "Windsurf",
      type: "ide",
      status: "active",
      riskLevel: "medium",
      riskScore: 45,
      tokenUsage: 310000,
      deviceId: devices[1]._id,
      lastActive: new Date(Date.now() - 25 * 60 * 1000),
      version: "1.0.5",
      userId,
    },
  ]);

  await Mcp.insertMany([
    {
      name: "supabase-mcp",
      description: "Database read/write access",
      status: "active",
      riskLevel: "high",
      riskScore: 82,
      permissions: ["read", "write", "delete"],
      source: "remote",
      agentId: agents[0]._id,
      deviceId: devices[1]._id,
      userId,
    },
    {
      name: "filesystem",
      description: "Local file system access",
      status: "active",
      riskLevel: "medium",
      riskScore: 55,
      permissions: ["read", "write"],
      source: "local",
      agentId: agents[1]._id,
      deviceId: devices[0]._id,
      userId,
    },
    {
      name: "github",
      description: "GitHub repository access",
      status: "active",
      riskLevel: "medium",
      riskScore: 48,
      permissions: ["read", "write"],
      source: "remote",
      agentId: agents[0]._id,
      deviceId: devices[1]._id,
      userId,
    },
    {
      name: "browser",
      description: "Browser automation",
      status: "quarantined",
      riskLevel: "high",
      riskScore: 91,
      permissions: ["read", "write", "execute"],
      source: "remote",
      agentId: agents[4]._id,
      deviceId: devices[4]._id,
      userId,
    },
    {
      name: "slack",
      description: "Slack messaging",
      status: "active",
      riskLevel: "low",
      riskScore: 18,
      permissions: ["read", "write"],
      source: "remote",
      agentId: agents[2]._id,
      deviceId: devices[2]._id,
      userId,
    },
    {
      name: "puppeteer",
      description: "Headless browser control",
      status: "blocked",
      riskLevel: "high",
      riskScore: 88,
      permissions: ["read", "write", "execute"],
      source: "remote",
      agentId: agents[5]._id,
      deviceId: devices[1]._id,
      userId,
    },
  ]);

  await Policy.insertMany([
    {
      name: "Block destructive DB commands",
      description: "Block DROP, TRUNCATE, DELETE without WHERE on production",
      action: "block",
      target: "action",
      condition: "command matches DROP|TRUNCATE",
      enabled: true,
      userId,
    },
    {
      name: "Quarantine high-risk MCPs",
      description: "Auto-quarantine MCPs with risk score > 70",
      action: "block",
      target: "mcp",
      condition: "riskScore > 70",
      enabled: true,
      userId,
    },
    {
      name: "Warn on personal AI accounts",
      description: "Warn when user signs in with non-company email",
      action: "warn",
      target: "agent",
      condition: "email not matching company domain",
      enabled: true,
      userId,
    },
    {
      name: "Block secrets in prompts",
      description: "Detect and block API keys / passwords in AI prompts",
      action: "block",
      target: "action",
      condition: "contains secret pattern",
      enabled: true,
      userId,
    },
    {
      name: "Allow approved coding agents only",
      description: "Only Cursor, Claude Code, Copilot allowed",
      action: "block",
      target: "agent",
      condition: "agent not in allowlist",
      enabled: false,
      userId,
    },
    {
      name: "Token budget alert",
      description: "Warn when daily token usage exceeds 500K",
      action: "warn",
      target: "action",
      condition: "dailyTokens > 500000",
      enabled: true,
      userId,
    },
  ]);

  await Alert.insertMany([
    {
      title: "Claude attempted DROP TABLE on production DB",
      description: "Blocked by policy before execution",
      severity: "critical",
      status: "open",
      source: "Claude Code",
      userId,
    },
    {
      title: "High-risk MCP detected: browser",
      description: "Unvetted MCP with execute permissions",
      severity: "high",
      status: "open",
      source: "MCP Scanner",
      userId,
    },
    {
      title: "Personal ChatGPT account used on work device",
      description: "User signed in with personal Gmail",
      severity: "medium",
      status: "acknowledged",
      source: "ChatGPT Desktop",
      userId,
    },
    {
      title: "Token usage spike — Claude Code",
      description: "Token consumption 3x above weekly average",
      severity: "low",
      status: "open",
      source: "Analytics",
      userId,
    },
    {
      title: "Blocked: file deletion via filesystem MCP",
      description: "Policy blocked recursive delete action",
      severity: "high",
      status: "resolved",
      source: "Cursor",
      userId,
    },
  ]);

  return { seeded: true };
}
