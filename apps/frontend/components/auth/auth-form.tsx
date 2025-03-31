"use client";
import { useState } from "react";

type Props = {
  mode: "login" | "signup";
};

const AuthForm = ({ mode }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5001/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(
        mode === "signup" ? "회원가입 성공! 로그인해주세요." : "로그인 성공!",
      );
      if (mode === "login") {
        localStorage.setItem("token", data.token);
        // TODO: 이동 or 리프레시
      }
    } else {
      setMessage(
        data.error || `${mode === "signup" ? "회원가입" : "로그인"} 실패`,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" && (
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border p-2"
        />
      )}
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded border p-2"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded border p-2"
      />
      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-2 text-white"
      >
        {mode === "signup" ? "회원가입" : "로그인"}
      </button>

      {message && <p className="mt-2 text-center text-sm">{message}</p>}
    </form>
  );
};

export default AuthForm;
