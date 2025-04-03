import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true }, // 해시해야 됨.
  name: { type: String },
  upbitAccessKey: { type: String, default: "" },
  upbitSecretKey: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
