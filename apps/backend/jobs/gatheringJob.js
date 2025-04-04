import { upbitRequest } from "../config/upbit.js";
import Gathering from "../models/gathering.js";
import User from "../models/user.js";
import { decrypt } from "../utils/encrypt.js";

export const runGatheringJob = async () => {
  const gatheringList = await Gathering.find({ start: true });
  for (const { user, market } of gatheringList) {
    try {
      const u = await User.findById(user);
      const accessKey = decrypt(u.upbitAccessKey);
      const secretKey = decrypt(u.upbitSecretKey);

      await upbitRequest(
        "/orders",
        "POST",
        {
          market,
          side: "bid",
          price: "5000", // 매수 금액 (고정)
          ord_type: "price",
        },
        accessKey,
        secretKey
      );

      console.log(`✅ ${u.email} - ${market} 매수 완료`);
    } catch (err) {
      console.error(`❌ ${user} - ${market} 매수 실패`, err.message);
    }
  }
};
