"use client";

import { FormEvent } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { validateWalletAddress } from "@/lib/validation";
import StaticHeader from "./StaticHeader";

interface HeaderProps {
  walletInput: string;
  setWalletInput: (value: string) => void;
  walletAddress: `0x${string}` | undefined;
  setWalletAddress: (address: `0x${string}`) => void;
  copied: boolean;
  setCopied: (copied: boolean) => void;
  walletError: string | null;
  setWalletError: (error: string | null) => void;
}

export default function Header({
  walletInput,
  setWalletInput,
  walletAddress,
  setWalletAddress,
  copied,
  setCopied,
  walletError,
  setWalletError,
}: HeaderProps) {
  const isWalletValid = validateWalletAddress(walletInput);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isWalletValid) {
      setWalletAddress(walletInput.trim() as `0x${string}`);
      setWalletError(null);
    } else {
      setWalletError("Please enter a valid Ethereum address.");
    }
  };

  const handleCopyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <header className="w-full bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 gap-2">
        <StaticHeader />

        <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
          <input
            type="text"
            value={walletInput}
            onChange={e => {
              setWalletInput(e.target.value);
              if (walletError) setWalletError(null);
            }}
            placeholder="Paste wallet address..."
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white placeholder-gray-400 text-xs w-56 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-lg"
            disabled={!isWalletValid}
          >
            Check NFT&apos;s
          </button>
        </form>

        {walletError && (
          <p className="text-red-400 text-xs mt-1">{walletError}</p>
        )}

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
      </div>
    </header>
  );
}
