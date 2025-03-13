/**
 * 이동평균(MA) 계산 함수
 * @param {number[]} prices 가격 배열
 * @param {number} period 이동평균 기간
 * @returns {number[]} 이동평균 값 배열
 */
export const calculateMovingAverage = (prices, period) => {
  const average = prices.map((_, index, arr) => {
    if (index < period - 1) {
      return null;
    }
    const sliced = arr.slice(index - period + 1, index + 1);
    return sliced.reduce((sum, price) => sum + price, 0) / period;
  });

  return average;
};

/**
 * RSI (Relative Strength Index) 계산 함수
 * @param {number[]} prices 가격 배열
 * @param {number} period RSI 기간
 * @returns {number[]} RSI 값 배열
 */
export const calculateRSI = (prices, period = 14) => {
  let gains = [];
  let losses = [];

  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff > 0) gains.push(diff);
    else losses.push(Math.abs(diff));
  }

  const avgGain = gains.reduce((sum, g) => sum + g, 0) / period;
  const avgLoss = losses.reduce((sum, l) => sum + l, 0) / period;

  const rs = avgGain / avgLoss;
  const rsi = 100 - 100 / (1 + rs);
  return rsi;
};
