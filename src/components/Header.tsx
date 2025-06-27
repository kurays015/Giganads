import StaticHeader from "@/components/StaticHeader";
import WalletAddress from "@/components/WalletAddress";
import WalletError from "@/components/WalletError";

export default function Header() {
  return (
    <header className="w-full bg-black/20 backdrop-blur-sm border-b border-white/10 hidden lg:block">
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 gap-2">
        <StaticHeader />
        <WalletError />
        <WalletAddress />
      </div>
    </header>
  );
}
