import { BASE_URL } from "@/constants/url";

type Account = {
  currency: string;
  balance: string;
  avg_buy_price: string;
};

const AccountPage = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/upbit/accounts`);

    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status} ${res.statusText}`);
    }

    const accounts: Account[] = await res.json();

    return (
      <div>
        <h1>내 계좌 정보</h1>
        <ul>
          {accounts.map((acc, index) => (
            <li key={index}>
              <strong>{acc.currency}</strong>: {acc.balance} (평균 매수가:{" "}
              {acc.avg_buy_price}원)
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("계좌 정보를 가져오는 중 에러 발생:", error);

    return (
      <div>
        <h1>내 계좌 정보</h1>
        <p>계좌 정보를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }
};

export default AccountPage;
