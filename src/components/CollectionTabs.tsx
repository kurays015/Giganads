import Image from "next/image";
import { Collection } from "@/types/collection";

interface CollectionTabsProps {
  selectedCollection: Collection;
  activeTab: "overview" | "analytics" | "tools" | "gallery";
  setActiveTab: (tab: "overview" | "analytics" | "tools" | "gallery") => void;
}

export default function CollectionTabs({
  selectedCollection,
  activeTab,
  setActiveTab,
}: CollectionTabsProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-6">
      <div className="flex items-center space-x-4 mb-4">
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
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white mb-1">
            {selectedCollection.collection.name || "Unknown Collection"}
          </h2>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {selectedCollection.collection.description ||
              "No description available"}
          </p>
          <div className="flex space-x-2">
            {(["overview", "analytics", "tools", "gallery"] as const).map(
              tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                    activeTab === tab
                      ? "bg-purple-500/20 text-white border border-purple-500/50"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
