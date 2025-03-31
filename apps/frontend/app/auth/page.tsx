"use client";
import { useState } from "react";
import AuthForm from "~/components/auth/auth-form";

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="mx-auto max-w-md p-6">
      <AuthForm mode={mode} />

      <p className="mt-4 text-center text-sm text-gray-600">
        {mode === "login" ? (
          <>
            아직 계정이 없으신가요?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-blue-600 underline"
            >
              회원가입
            </button>
          </>
        ) : (
          <>
            이미 계정이 있으신가요?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-blue-600 underline"
            >
              로그인
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthPage;
