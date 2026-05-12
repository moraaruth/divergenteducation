/**
 * Seed script — creates demo users for all roles
 * Run: node scripts/seed.mjs
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

const TenantSchema = new mongoose.Schema({
  name:               String,
  slug:               { type: String, unique: true },
  subscriptionTier:   { type: String, default: "pro" },
  subscriptionStatus: { type: String, default: "active" },
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  email:    { type: String, unique: true, lowercase: true },
  password: String,
  name:     String,
  role:     String,
  tenantId: mongoose.Schema.Types.ObjectId,
  subscriptionTier: { type: String, default: "pro" },
  profile:  { type: Object, default: {} },
  settings: { type: Object, default: { notifications: true, emailDigest: true, language: "en", timezone: "UTC", darkMode: false } },
  stats:    { type: Object, default: { totalXp: 0, level: 1, streak: 0, lessonsCompleted: 0, focusMinutes: 0 } },
  isActive:      { type: Boolean, default: true },
  emailVerified: { type: Boolean, default: true },
}, { timestamps: true });

const Tenant = mongoose.models.Tenant || mongoose.model("Tenant", TenantSchema);
const User   = mongoose.models.User   || mongoose.model("User",   UserSchema);

const DEMO_USERS = [
  { name: "Alex Johnson",  email: "child@demo.com",   role: "child"        },
  { name: "Sarah Johnson", email: "parent@demo.com",  role: "parent"       },
  { name: "Ms. Chen",      email: "teacher@demo.com", role: "teacher"      },
  { name: "Admin User",    email: "admin@demo.com",   role: "school_admin" },
  { name: "Super Admin",   email: "super@demo.com",   role: "super_admin"  },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected\n");

  let tenant = await Tenant.findOne({ slug: "demo-school" });
  if (!tenant) {
    tenant = await Tenant.create({ name: "Demo School", slug: "demo-school" });
    console.log("Created tenant: Demo School");
  } else {
    console.log("Tenant already exists");
  }

  const hash = await bcrypt.hash("demo1234", 12);

  for (const u of DEMO_USERS) {
    const exists = await User.findOne({ email: u.email });
    if (exists) {
      console.log(`Skipped (exists): ${u.email}`);
      continue;
    }
    await User.create({
      ...u,
      password: hash,
      tenantId: tenant._id,
      stats: {
        totalXp:          u.role === "child" ? 1250 : 0,
        level:            u.role === "child" ? 4    : 1,
        streak:           u.role === "child" ? 7    : 0,
        lessonsCompleted: u.role === "child" ? 12   : 0,
        focusMinutes:     u.role === "child" ? 42   : 0,
      },
    });
    console.log(`Created ${u.role}: ${u.email}`);
  }

  console.log("\nSeed complete!");
  console.log("Login with password: demo1234");
  console.log("  child@demo.com   -> /dashboard/child");
  console.log("  parent@demo.com  -> /dashboard/parent");
  console.log("  teacher@demo.com -> /dashboard/teacher");
  console.log("  admin@demo.com   -> /dashboard/admin");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
