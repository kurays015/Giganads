"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { validateWalletAddress } from "@/lib/validation";
import { FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function WalletSubmitForm() {
  const {
    walletInput,
    setWalletInput,
    walletError,
    setWalletError,
    setWalletAddress,
  } = useDashboard();
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

  return (
    <form
      className="flex flex-col justify-center sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2 w-full"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        value={walletInput}
        onChange={e => {
          setWalletInput(e.target.value);
          if (walletError) setWalletError(null);
        }}
        placeholder="Paste wallet address..."
        className="w-full sm:w-56 bg-white/10 border border-white/20 rounded-lg px-3 py-2 sm:py-1.5 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <Button
        type="submit"
        className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 sm:py-1.5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-lg"
        disabled={!isWalletValid}
      >
        Check NFT&apos;s
      </Button>
    </form>
  );
}
