import Link from "next/link";

import NavigationContent from "./navigation-content";

export default function Navigation() {
  return (
    <nav className="bg-gray-800 p-4 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="text-2xl font-bold">
          CoinBot 🚀
        </Link>
        <NavigationContent />
      </div>
    </nav>
  );
}
