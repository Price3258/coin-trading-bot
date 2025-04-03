"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAuthStore } from "~/store/auth";

const NavigationContent = () => {
  const { isLoggedIn, clear } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("http://localhost:5001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    clear();
    router.push("/auth");
  };

  return (
    <>
      {/* 로그인 여부에 따른 네비게이션 */}
      {isLoggedIn ? (
        <div className="flex items-center space-x-6">
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
            <li>
              <Link href="/gathering" className="hover:text-gray-300">
                모으기
              </Link>
            </li>
            <li>
              <Link href="/settings" className="hover:text-gray-300">
                설정
              </Link>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-3 py-1 text-sm hover:bg-red-600"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <Link
            href="/auth"
            className="rounded border border-white px-3 py-1 text-sm transition hover:bg-white hover:text-gray-800"
          >
            로그인
          </Link>
          <Link
            href="/auth?mode=signup"
            className="rounded bg-blue-500 px-3 py-1 text-sm transition hover:bg-blue-600"
          >
            회원가입
          </Link>
        </div>
      )}
    </>
  );
};

export default NavigationContent;
