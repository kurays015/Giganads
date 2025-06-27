"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function WalletAddress() {
  const { walletAddress, copied, setCopied } = useDashboard();

  const handleCopyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <>
      {walletAddress && (
        <div className="text-right hidden sm:flex items-center space-x-2">
          <p className="text-gray-300 text-xs">Wallet</p>
          <p className="text-white font-mono text-xs">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
          <button
            onClick={handleCopyAddress}
            className="ml-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
            title="Copy wallet address"
            type="button"
          >
            {copied ? (
              <FiCheck className="w-4 h-4" />
            ) : (
              <FiCopy className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </>
  );
}
