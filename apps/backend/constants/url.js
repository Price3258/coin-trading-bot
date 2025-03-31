export const UPBIT_CANDLE_API = "https://api.upbit.com/v1/candles/minutes/60"; // 1시간봉

const MONGO_ID = process.env.MONGO_ID;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

export const MONGO_URI = `mongodb+srv://${MONGO_ID}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.k3x69.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority&appName=${MONGO_CLUSTER}`;
