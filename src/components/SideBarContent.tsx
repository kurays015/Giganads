"use client";

import Image from "next/image";
import { useDashboard } from "@/contexts/DashboardContext";

interface SideBarContentProps {
  onClose?: () => void;
}

export default function SideBarContent({ onClose }: SideBarContentProps) {
  const { collections, selectedCollection, setSelectedCollection } =
    useDashboard();

  return (
    <div className="space-y-4">
      {collections.map(collection => (
        <div
          key={collection.collection.id}
          onClick={() => {
            setSelectedCollection(collection);
            onClose?.();
          }}
          className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center gap-4 mb-4 shadow-sm hover:shadow-lg ${
            selectedCollection?.collection?.id === collection?.collection?.id
              ? "bg-purple-500/30 border-purple-500/70"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
          style={{ minHeight: 64 }}
        >
          <Image
            width={40}
            height={40}
            src={collection.collection.image || "/placeholder-nft.svg"}
            alt={collection.collection.name || "NFT Collection"}
            className="w-10 h-10 rounded-lg object-cover bg-gray-800"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = "/placeholder-nft.svg";
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-xs truncate max-w-[140px]">
              {collection.collection.name ||
                collection.collection.id.slice(0, 8) + "..."}
            </h3>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-300 text-xs truncate max-w-[70px]">
                {collection.ownership.tokenCount}
              </span>
              <span className="text-green-400 text-xs font-semibold">
                {collection.collection.floorAskPrice?.amount?.decimal?.toLocaleString(
                  undefined,
                  { maximumFractionDigits: 4 }
                ) ?? 0}{" "}
                MON
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
