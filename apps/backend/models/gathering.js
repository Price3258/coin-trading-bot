import mongoose from "mongoose";

const gatheringSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 기존 User 모델이 있다고 가정
      required: true,
    },
    market: {
      type: String,
      required: true,
    },
    start: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "gathering",
  }
);

// 유저 + 마켓 조합이 중복되지 않도록 unique 설정
gatheringSchema.index({ user: 1, market: 1 }, { unique: true });

const Gathering =
  mongoose.models.Gathering || mongoose.model("Gathering", gatheringSchema);

export default Gathering;
