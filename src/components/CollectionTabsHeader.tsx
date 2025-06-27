"use client";
import { useDashboard } from "@/contexts/DashboardContext";
import Image from "next/image";

export default function CollectionTabsHeader() {
  const { selectedCollection } = useDashboard();

  if (!selectedCollection) {
    return null;
  }

  return (
    <div className="flex items-start space-x-4 mb-4">
      <div className="flex-shrink-0">
        <Image
          width={64}
          height={64}
          src={selectedCollection.collection.image || "/placeholder-nft.svg"}
          alt={selectedCollection.collection.name || "NFT Collection"}
          className="w-16 h-16 rounded-xl object-cover border-2 border-white/20"
          onError={e => {
            e.currentTarget.src = "/placeholder-nft.svg";
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold text-white mb-1">
          {selectedCollection.collection.name || "Unknown Collection"}
        </h2>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {selectedCollection.collection.description ||
            "No description available"}
        </p>
      </div>
    </div>
  );
}
