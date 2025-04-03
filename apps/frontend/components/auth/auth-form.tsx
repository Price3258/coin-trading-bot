"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BASE_URL } from "~/constants/url";

type Props = {
  mode: "login" | "signup";
};

const AuthForm = ({ mode }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
      setMessage(
        mode === "signup" ? "회원가입 성공! 로그인해주세요." : "로그인 성공!",
      );
      if (mode === "login") {
        router.replace("/");
      }
      if (mode === "signup") {
        router.replace("/auth?mode=login");
      }
    } else {
      setSuccess(false);
      setMessage(
        data.error || `${mode === "signup" ? "회원가입" : "로그인"} 실패`,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      {mode === "signup" && (
        <div>
          <label className="mb-1 block text-sm text-gray-200">이름</label>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-gray-600 bg-gray-100 p-2 text-black placeholder-gray-500"
          />
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm text-gray-200">이메일</label>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-gray-600 bg-gray-100 p-2 text-black placeholder-gray-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-200">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-gray-600 bg-gray-100 p-2 text-black placeholder-gray-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600"
      >
        {mode === "signup" ? "회원가입" : "로그인"}
      </button>

      {message && (
        <p
          className={`mt-2 text-center text-sm ${
            success ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default AuthForm;
