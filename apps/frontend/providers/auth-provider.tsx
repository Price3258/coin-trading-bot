"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuthStore } from "~/store/auth";
import { BASE_URL } from "~/constants/url";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { setUser, clear } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setUser(data.user);
      } catch {
        clear();
        if (pathname !== "/auth") {
          router.replace("/auth");
        }
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, [pathname, setUser, clear, router]);

  if (loading) {
    return <div className="p-4 text-center">⏳ 로그인 확인 중...</div>;
  }

  return <>{children}</>;
}
