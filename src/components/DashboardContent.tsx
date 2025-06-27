"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import Collections from "@/components/Collections";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import WalletSubmitForm from "@/components/WalletSubmitForm";
import Sidebar from "@/components/Sidebar";

export default function DashboardContent() {
  const { walletAddress, collections, loading, error } = useDashboard();

  if (!walletAddress) {
    return (
      <div className="h-[calc(100vh-60px)] w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full max-w-md">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Enter your wallet address
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 px-2">
              Paste your wallet address to view your NFT analytics dashboard.
            </p>
            <div className="w-full">
              <WalletSubmitForm />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (collections.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex h-[calc(100vh-60px)] w-full">
      <Sidebar />
      <Collections />
    </div>
  );
}
