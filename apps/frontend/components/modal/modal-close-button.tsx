"use client";

import { useRouter } from "next/navigation";

export default function ModalCloseButton() {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <button
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
      onClick={onClose}
    >
      ✖
    </button>
  );
}
