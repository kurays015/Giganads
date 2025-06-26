"use client";

import React, { useState, useMemo, useEffect } from "react";
import { PriceAlert } from "@/types/collection";
import { useMagicEdenCollections } from "@/hooks/useMagicEdenCollections";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CollectionTabs from "@/components/CollectionTabs";
import OverviewTab from "@/components/OverviewTab";
import AnalyticsTab from "@/components/AnalyticsTab";
import ToolsTab from "@/components/ToolsTab";
import GalleryTab from "@/components/GalleryTab";
import PriceAlertModal from "@/components/PriceAlertModal";

export default function Home() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"7day" | "30day">(
    "7day"
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "analytics" | "tools" | "gallery"
  >("overview");
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    targetPrice: "",
    condition: "above" as "above" | "below",
  });
  const [
    selectedCollectionsForComparison,
    setSelectedCollectionsForComparison,
  ] = useState<string[]>([]);
  const [walletInput, setWalletInput] = useState("");
  const [walletAddress, setWalletAddress] = useState<`0x${string}`>();
  const [copied, setCopied] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

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

  const addPriceAlert = () => {
    if (selectedCollection && newAlert.targetPrice) {
      const alert: PriceAlert = {
        id: Date.now().toString(),
        collectionId: selectedCollection.collection.id,
        collectionName: selectedCollection.collection.name,
        targetPrice: parseFloat(newAlert.targetPrice),
        condition: newAlert.condition,
        isActive: true,
      };
      setPriceAlerts([...priceAlerts, alert]);
      setNewAlert({ targetPrice: "", condition: "above" });
      setShowAlertForm(false);
    }
  };

  const removePriceAlert = (alertId: string) => {
    setPriceAlerts(priceAlerts.filter(alert => alert.id !== alertId));
  };

  const toggleCollectionComparison = (collectionId: string) => {
    setSelectedCollectionsForComparison(prev =>
      prev.includes(collectionId)
        ? prev.filter(id => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  if (!walletAddress) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
        <Header
          walletInput={walletInput}
          setWalletInput={setWalletInput}
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          copied={copied}
          setCopied={setCopied}
          walletError={walletError}
          setWalletError={setWalletError}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-2">
              Enter your wallet address
            </h2>
            <p className="text-gray-300">
              Paste your wallet address above to view your NFT analytics
              dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading NFT Collection Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 max-w-md">
            <h2 className="text-red-400 text-xl font-bold mb-2">Error</h2>
            <p className="text-red-300">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">
            No collections found for this wallet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header
        walletInput={walletInput}
        setWalletInput={setWalletInput}
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        copied={copied}
        setCopied={setCopied}
        walletError={walletError}
        setWalletError={setWalletError}
      />

      <div className="flex h-[calc(100vh-60px)] w-full">
        <Sidebar
          collections={collections}
          selectedCollection={selectedCollection}
          setSelectedCollection={c => setSelectedCollectionId(c.collection.id)}
          selectedCollectionsForComparison={selectedCollectionsForComparison}
          toggleCollectionComparison={toggleCollectionComparison}
          portfolioValue={portfolioValue}
        />

        <div className="flex-1 overflow-y-auto">
          {selectedCollection ? (
            <div className="p-6">
              <CollectionTabs
                selectedCollection={selectedCollection}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {activeTab === "overview" && (
                <OverviewTab
                  selectedCollection={selectedCollection}
                  setShowAlertForm={setShowAlertForm}
                  selectedCollectionsForComparison={
                    selectedCollectionsForComparison
                  }
                  toggleCollectionComparison={toggleCollectionComparison}
                />
              )}

              {activeTab === "analytics" && (
                <AnalyticsTab
                  selectedCollection={selectedCollection}
                  selectedTimeframe={selectedTimeframe}
                  setSelectedTimeframe={setSelectedTimeframe}
                />
              )}

              {activeTab === "tools" && (
                <ToolsTab
                  collections={collections}
                  priceAlerts={priceAlerts}
                  setShowAlertForm={setShowAlertForm}
                  removePriceAlert={removePriceAlert}
                  selectedCollectionsForComparison={
                    selectedCollectionsForComparison
                  }
                  toggleCollectionComparison={toggleCollectionComparison}
                  portfolioValue={portfolioValue}
                />
              )}

              {activeTab === "gallery" && (
                <GalleryTab selectedCollection={selectedCollection} />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-white text-lg">
                Select a collection to view details
              </p>
            </div>
          )}
        </div>
      </div>

      <PriceAlertModal
        showAlertForm={showAlertForm}
        setShowAlertForm={setShowAlertForm}
        newAlert={newAlert}
        setNewAlert={setNewAlert}
        addPriceAlert={addPriceAlert}
      />
    </div>
  );
}
