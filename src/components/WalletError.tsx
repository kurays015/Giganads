"use client";

import { useDashboard } from "@/contexts/DashboardContext";

export default function WalletError() {
  const { walletError } = useDashboard();

  return (
    <>
      {walletError && (
        <p className="text-red-400 text-xs mt-1">{walletError}</p>
      )}
    </>
  );
}
