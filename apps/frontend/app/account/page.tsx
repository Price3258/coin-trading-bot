import { BASE_URL } from "@/constants/url";

type Account = {
  currency: string;
  balance: string;
  avg_buy_price: string;
};

const AccountPage = async () => {
  const res = await fetch(`${BASE_URL}/api/upbit/accounts`);
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
};

export default AccountPage;
