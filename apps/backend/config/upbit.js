import axios from "axios";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const UPBIT_SERVER_URL = "https://api.upbit.com/v1";

/**
 * 업비트 API 요청을 위한 JWT 생성
 */
const generateUpbitJWT = (accessKey, secretKey, query = "") => {
  const payload = {
    access_key: accessKey,
    nonce: crypto.randomUUID(),
  };

  if (query) {
    const hash = crypto.createHash("sha512");
    hash.update(query);
    payload.query_hash = hash.digest("hex");
    payload.query_hash_alg = "SHA512";
  }

  return jwt.sign(payload, secretKey);
};

/**
 * 유저별 업비트 API 요청 함수
 * @param {string} endpoint - API endpoint (ex. /orders)
 * @param {string} method - HTTP method
 * @param {Object} params - query parameters
 * @param {string} accessKey - 유저의 access key
 * @param {string} secretKey - 유저의 secret key
 */
export const upbitRequest = async (
  endpoint,
  method = "GET",
  params = {},
  accessKey,
  secretKey
) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const jwtToken = generateUpbitJWT(accessKey, secretKey, queryString);

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
