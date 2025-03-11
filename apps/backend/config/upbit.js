import axios from "axios";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const UPBIT_ACCESS_KEY = process.env.UPBIT_ACCESS_KEY;
const UPBIT_SECRET_KEY = process.env.UPBIT_SECRET_KEY;
const UPBIT_SERVER_URL = "https://api.upbit.com/v1";

/**
 * 업비트 API 요청을 위한 JWT 토큰 생성 함수
 */
const generateUpbitJWT = (query = "") => {
  const payload = {
    access_key: UPBIT_ACCESS_KEY,
    nonce: crypto.randomUUID(),
  };

  if (query) {
    const hash = crypto.createHash("sha512");
    hash.update(query);
    payload.query_hash = hash.digest("hex");
    payload.query_hash_alg = "SHA512";
  }

  return jwt.sign(payload, UPBIT_SECRET_KEY);
};

/**
 * 업비트 API 호출 함수
 */
export const upbitRequest = async (endpoint, method = "GET", params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const jwtToken = generateUpbitJWT(queryString);

    const options = {
      method,
      url: `${UPBIT_SERVER_URL}${endpoint}${queryString ? `?${queryString}` : ""}`,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(
      "업비트 API 요청 오류:",
      error.response?.data || error.message
    );
    throw error;
  }
};
