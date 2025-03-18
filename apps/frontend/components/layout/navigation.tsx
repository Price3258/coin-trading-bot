import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-gray-800 p-4 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="text-2xl font-bold">
          CoinBot 🚀
        </Link>

        {/* 네비게이션 링크 */}
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300">
              홈
            </Link>
          </li>
          <li>
            <Link href="/order-list" className="hover:text-gray-300">
              주문 내역
            </Link>
          </li>
          <li>
            <Link href="/trading" className="hover:text-gray-300">
              자동 거래 전략
            </Link>
          </li>
          <li>
            <Link href="/ticker" className="hover:text-gray-300">
              시세 조회
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
