import mongoose, { Schema } from "mongoose";

// ─── Tenant ──────────────────────────────────────────────────────────────────

const TenantSchema = new Schema(
  {
    name:   { type: String, required: true, trim: true },
    slug:   { type: String, required: true, unique: true, lowercase: true },
    logo:   String,
    subscriptionTier:   { type: String, enum: ["free","starter","pro","enterprise"], default: "free" },
    subscriptionStatus: { type: String, enum: ["active","trialing","past_due","canceled"], default: "trialing" },
    stripeCustomerId:     { type: String, select: false },
    stripeSubscriptionId: { type: String, select: false },
    trialEndsAt: Date,
    settings: {
      maxUsers:        { type: Number, default: 10 },
      features:        [String],
      customBranding:  { primaryColor: String, logo: String },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TenantSchema.index({ slug: 1 });

export const TenantModel = mongoose.models.Tenant ?? mongoose.model("Tenant", TenantSchema);

// ─── MoodEntry ───────────────────────────────────────────────────────────────

const MoodEntrySchema = new Schema(
  {
    userId:    { type: Schema.Types.ObjectId, ref: "User", required: true },
    tenantId:  { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
    mood:      { type: Number, min: 1, max: 5, required: true },
    label:     { type: String, enum: ["overwhelmed","sad","okay","good","amazing"] },
    note:      String,
    triggers:  [String],
    aiInsight: String,
    energy:    { type: Number, min: 1, max: 5 },
    focus:     { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

MoodEntrySchema.index({ userId: 1, createdAt: -1 });

export const MoodEntryModel = mongoose.models.MoodEntry ?? mongoose.model("MoodEntry", MoodEntrySchema);

// ─── Lesson ──────────────────────────────────────────────────────────────────

const LessonSchema = new Schema(
  {
    title:       { type: String, required: true },
    description: String,
    type:        { type: String, enum: ["visual","audio","interactive","story","stem","life_skills","emotional_iq"], required: true },
    difficulty:  { type: Number, min: 1, max: 3, default: 1 },
    duration:    { type: Number, default: 10 }, // minutes
    xpReward:    { type: Number, default: 50 },
    thumbnail:   String,
    tags:        [String],
    content:     [{ type: { type: String }, data: Schema.Types.Mixed }],
    tenantId:    { type: Schema.Types.ObjectId, ref: "Tenant" }, // null = global
    createdBy:   { type: Schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: false },
    ageRange:    { min: Number, max: Number },
  },
  { timestamps: true }
);

LessonSchema.index({ type: 1, difficulty: 1 });
LessonSchema.index({ tags: 1 });

export const LessonModel = mongoose.models.Lesson ?? mongoose.model("Lesson", LessonSchema);

// ─── LearningProgress ────────────────────────────────────────────────────────

const LearningProgressSchema = new Schema(
  {
    userId:      { type: Schema.Types.ObjectId, ref: "User", required: true },
    lessonId:    { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    completed:   { type: Boolean, default: false },
    score:       Number,
    timeSpent:   { type: Number, default: 0 },
    completedAt: Date,
  },
  { timestamps: true }
);

LearningProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

export const LearningProgressModel = mongoose.models.LearningProgress ?? mongoose.model("LearningProgress", LearningProgressSchema);

// ─── Routine ─────────────────────────────────────────────────────────────────

const RoutineSchema = new Schema(
  {
    userId:      { type: Schema.Types.ObjectId, ref: "User", required: true },
    name:        { type: String, required: true },
    type:        { type: String, enum: ["morning","evening","school","custom"], default: "custom" },
    steps: [{
      title:    String,
      duration: Number,
      icon:     String,
      order:    Number,
    }],
    aiGenerated: { type: Boolean, default: false },
    active:      { type: Boolean, default: true },
    schedule:    { days: [String], time: String },
  },
  { timestamps: true }
);

export const RoutineModel = mongoose.models.Routine ?? mongoose.model("Routine", RoutineSchema);

// ─── Achievement ─────────────────────────────────────────────────────────────

const AchievementSchema = new Schema(
  {
    userId:      { type: Schema.Types.ObjectId, ref: "User", required: true },
    type:        { type: String, required: true },
    title:       String,
    description: String,
    icon:        String,
    xp:          { type: Number, default: 0 },
    unlockedAt:  { type: Date, default: Date.now },
  },
  { timestamps: true }
);

AchievementSchema.index({ userId: 1 });

export const AchievementModel = mongoose.models.Achievement ?? mongoose.model("Achievement", AchievementSchema);

// ─── Message ─────────────────────────────────────────────────────────────────

const MessageSchema = new Schema(
  {
    senderId:   { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tenantId:   { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
    content:    { type: String, required: true, maxlength: 2000 },
    read:       { type: Boolean, default: false },
    type:       { type: String, enum: ["text","image","file"], default: "text" },
  },
  { timestamps: true }
);

MessageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

export const MessageModel = mongoose.models.Message ?? mongoose.model("Message", MessageSchema);
