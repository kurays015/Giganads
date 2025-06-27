import Link from "next/link";
import { useDashboard } from "@/contexts/DashboardContext";

export default function OverviewTab() {
  const { selectedCollection } = useDashboard();

  if (!selectedCollection) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Key Metrics */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Key Metrics</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Floor Price</span>
            <span className="text-white font-semibold">
              {selectedCollection?.collection.floorAskPrice?.amount?.decimal ??
                0}{" "}
              MON
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total Supply</span>
            <span className="text-white font-semibold">
              {selectedCollection.collection.tokenCount
                ? parseInt(selectedCollection.collection.tokenCount)
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Owned</span>
            <span className="text-white font-semibold">
              {selectedCollection?.ownership?.tokenCount || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">On Sale</span>
            <span className="text-white font-semibold">
              {selectedCollection?.ownership?.onSaleCount || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Link
            href={`https://magiceden.io/collections/monad-testnet/${selectedCollection.collection.id}`}
            referrerPolicy="no-referrer"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg p-3 text-white font-medium transition-all text-sm no-underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <span role="img" aria-label="chart">
              📈
            </span>
            View on Magic Eden
          </Link>
        </div>
      </div>
    </div>
  );
}
