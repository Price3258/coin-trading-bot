"use client";

import { useState } from "react";
import { BASE_URL } from "~/constants/url";

export default function UpbitKeySettings() {
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${BASE_URL}/api/settings/upbit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ accessKey, secretKey }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("키 업데이트 완료");
      } else {
        setMessage("업데이트 실패: " + data.error);
      }
    } catch (err) {
      setMessage(
        "오류: " + (err instanceof Error ? err.message : "알 수 없는 오류"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded border border-gray-200 bg-white p-6 shadow-md"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          🔐 업비트 API 키 설정
        </h2>

        <div>
          <label className="block font-medium text-gray-700">Access Key</label>
          <input
            type="text"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Secret Key</label>
          <input
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "저장 중..." : "저장하기"}
        </button>

        {message && <p className="pt-2 text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
