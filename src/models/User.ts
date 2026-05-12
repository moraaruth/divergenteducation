import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import type { UserRole, SubscriptionTier } from "@/types";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  avatar?: string;
  role: UserRole;
  tenantId: mongoose.Types.ObjectId;
  subscriptionTier: SubscriptionTier;
  profile: {
    dateOfBirth?: Date;
    diagnoses?: string[];
    sensoryPreferences?: {
      reducedMotion: boolean;
      highContrast: boolean;
      largeText: boolean;
      soundEnabled: boolean;
      colorTheme: string;
      uiIntensity: string;
    };
    learningStyle?: string;
    communicationLevel?: number;
    interests?: string[];
    avatarColor?: string;
    pronouns?: string;
  };
  settings: {
    notifications: boolean;
    emailDigest: boolean;
    language: string;
    timezone: string;
    darkMode: boolean;
  };
  stats: {
    totalXp: number;
    level: number;
    streak: number;
    lastActiveAt?: Date;
    lessonsCompleted: number;
    focusMinutes: number;
  };
  linkedUsers: mongoose.Types.ObjectId[]; // parent↔child, teacher↔student
  isActive: boolean;
  emailVerified: boolean;
  refreshToken?: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    name:     { type: String, required: true, trim: true },
    avatar:   String,
    role:     { type: String, enum: ["child","parent","teacher","school_admin","super_admin"], required: true },
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
    subscriptionTier: { type: String, enum: ["free","starter","pro","enterprise"], default: "free" },
    profile: {
      dateOfBirth: Date,
      diagnoses:   [String],
      sensoryPreferences: {
        reducedMotion: { type: Boolean, default: false },
        highContrast:  { type: Boolean, default: false },
        largeText:     { type: Boolean, default: false },
        soundEnabled:  { type: Boolean, default: true },
        colorTheme:    { type: String, default: "calm" },
        uiIntensity:   { type: String, default: "moderate" },
      },
      learningStyle:      String,
      communicationLevel: { type: Number, default: 2 },
      interests:          [String],
      avatarColor:        { type: String, default: "#6366f1" },
      pronouns:           String,
    },
    settings: {
      notifications: { type: Boolean, default: true },
      emailDigest:   { type: Boolean, default: true },
      language:      { type: String, default: "en" },
      timezone:      { type: String, default: "UTC" },
      darkMode:      { type: Boolean, default: false },
    },
    stats: {
      totalXp:          { type: Number, default: 0 },
      level:            { type: Number, default: 1 },
      streak:           { type: Number, default: 0 },
      lastActiveAt:     Date,
      lessonsCompleted: { type: Number, default: 0 },
      focusMinutes:     { type: Number, default: 0 },
    },
    linkedUsers:   [{ type: Schema.Types.ObjectId, ref: "User" }],
    isActive:      { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    refreshToken:  { type: String, select: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

UserSchema.index({ email: 1 });
UserSchema.index({ tenantId: 1, role: 1 });

export const UserModel = mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);
