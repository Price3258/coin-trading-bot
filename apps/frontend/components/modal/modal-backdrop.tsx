"use client";

import { useRouter } from "next/navigation";

export default function ModalBackdrop() {
  const router = useRouter();

  const onClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      router.back();
    }
  };

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm"
      onClick={onClose}
    />
  );
}
