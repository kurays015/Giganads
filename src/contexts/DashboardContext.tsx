"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Collection } from "@/types/collection";
import { useMagicEdenCollections } from "@/hooks/useMagicEdenCollections";

interface DashboardContextType {
  // Wallet state
  walletInput: string;
  setWalletInput: (input: string) => void;
  walletAddress: `0x${string}` | undefined;
  setWalletAddress: (address: `0x${string}` | undefined) => void;
  copied: boolean;
  setCopied: (copied: boolean) => void;
  walletError: string | null;
  setWalletError: (error: string | null) => void;

  // Collections state
  collections: Collection[];
  selectedCollection: Collection | null;
  setSelectedCollection: (collection: Collection) => void;
  portfolioValue: number;
  loading: boolean;
  error: Error | null;

  // Analytics state
  selectedTimeframe: "7day" | "30day";
  setSelectedTimeframe: (timeframe: "7day" | "30day") => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // Wallet state
  const [walletInput, setWalletInput] = useState("");
  const [walletAddress, setWalletAddress] = useState<`0x${string}`>();
  const [copied, setCopied] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);

  // Collections state
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

  // Analytics state
  const [selectedTimeframe, setSelectedTimeframe] = useState<"7day" | "30day">(
    "7day"
  );

  // Fetch collections data
  const {
    data: collections = [],
    isLoading: loading,
    error,
  } = useMagicEdenCollections(walletAddress);

  // Memoize selectedCollection
  const selectedCollection = useMemo(() => {
    if (!selectedCollectionId && collections.length > 0) {
      return collections[0];
    }
    return (
      collections.find(c => c.collection.id === selectedCollectionId) || null
    );
  }, [collections, selectedCollectionId]);

  // Memoize portfolio value
  const portfolioValue = useMemo(() => {
    return collections.reduce(
      (sum, item) =>
        sum + (item.collection.floorAskPrice?.amount?.decimal || 0),
      0
    );
  }, [collections]);

  // Set default selected collection id when collections change
  useEffect(() => {
    if (collections.length > 0 && !selectedCollectionId) {
      setSelectedCollectionId(collections[0].collection.id);
    }
  }, [collections, selectedCollectionId]);

  // Collection selection function
  const setSelectedCollection = (collection: Collection) => {
    setSelectedCollectionId(collection.collection.id);
  };

  const value: DashboardContextType = {
    // Wallet state
    walletInput,
    setWalletInput,
    walletAddress,
    setWalletAddress,
    copied,
    setCopied,
    walletError,
    setWalletError,

    // Collections state
    collections,
    selectedCollection,
    setSelectedCollection,
    portfolioValue,
    loading,
    error,

    // Analytics state
    selectedTimeframe,
    setSelectedTimeframe,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  return context;
}
