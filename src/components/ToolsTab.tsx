import Image from "next/image";
import { Collection, PriceAlert } from "@/types/collection";

interface ToolsTabProps {
  collections: Collection[];
  priceAlerts: PriceAlert[];
  setShowAlertForm: (show: boolean) => void;
  removePriceAlert: (alertId: string) => void;
  selectedCollectionsForComparison: string[];
  toggleCollectionComparison: (collectionId: string) => void;
  portfolioValue: number;
}

export default function ToolsTab({
  collections,
  priceAlerts,
  setShowAlertForm,
  removePriceAlert,
  selectedCollectionsForComparison,
  toggleCollectionComparison,
  portfolioValue,
}: ToolsTabProps) {
  const filteredCollections = collections.filter(
    c => !c.collection.name.includes("0x")
  );

  return (
    <div className="space-y-6">
      {/* Price Alerts */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Price Alerts</h3>
          <button
            onClick={() => setShowAlertForm(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            + Add Alert
          </button>
        </div>

        {priceAlerts.length === 0 ? (
          <p className="text-gray-300 text-center py-8">No price alerts set</p>
        ) : (
          <div className="space-y-3">
            {priceAlerts.map(alert => (
              <div
                key={alert.id}
                className="flex items-center justify-between bg-white/5 rounded-lg p-3"
              >
                <div>
                  <p className="text-white font-medium text-sm">
                    {alert.collectionName}
                  </p>
                  <p className="text-gray-300 text-xs">
                    Alert when price goes {alert.condition} {alert.targetPrice}{" "}
                    MON
                  </p>
                </div>
                <button
                  onClick={() => removePriceAlert(alert.id)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collection Comparison */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          Collection Comparison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCollections.slice(0, 4).map(collection => (
            <div
              key={collection.collection.id}
              className={`cursor-pointer p-3 rounded-lg border transition-all ${
                selectedCollectionsForComparison.includes(
                  collection.collection.id
                )
                  ? "bg-blue-500/20 border-blue-500/50"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
              onClick={() =>
                toggleCollectionComparison(collection.collection.id)
              }
            >
              <div className="flex items-center space-x-3">
                <Image
                  width={24}
                  height={24}
                  src={collection.collection.image || "/placeholder-nft.svg"}
                  alt={collection.collection.name || "NFT Collection"}
                  className="w-6 h-6 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-white text-xs font-medium truncate">
                    {collection.collection.name || "Unknown Collection"}
                  </p>
                  <p className="text-gray-300 text-xs">
                    Floor:{" "}
                    {collection.collection.floorAskPrice?.amount?.decimal ?? 0}{" "}
                    MON
                  </p>
                </div>
                {selectedCollectionsForComparison.includes(
                  collection.collection.id
                ) && <span className="text-blue-400 text-sm">✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Calculator */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          Portfolio Calculator
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4">
            <p className="text-green-300 text-xs">Total Value</p>
            <p className="text-white font-bold text-base">
              {portfolioValue.toFixed(2)} MON
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-4">
            <p className="text-blue-300 text-xs">Collections</p>
            <p className="text-white font-bold text-base">
              {filteredCollections.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4">
            <p className="text-purple-300 text-xs">Total NFTs</p>
            <p className="text-white font-bold text-base">
              {filteredCollections.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
