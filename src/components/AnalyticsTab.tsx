import { useDashboard } from "@/contexts/DashboardContext";

export default function AnalyticsTab() {
  const { selectedCollection, setSelectedTimeframe, selectedTimeframe } =
    useDashboard();

  if (!selectedCollection) {
    return null;
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString();
  };

  const getVolumeChangeColor = (change: number) => {
    return change >= 0 ? "text-green-500" : "text-red-500";
  };

  const getVolumeChangeIcon = (change: number) => {
    return change >= 0 ? "↗" : "↘";
  };

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
          <button
            onClick={() => setSelectedTimeframe("7day")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedTimeframe === "7day"
                ? "bg-white/20 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setSelectedTimeframe("30day")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedTimeframe === "30day"
                ? "bg-white/20 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Volume */}
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-300 font-semibold text-sm">Volume</h3>
            <span className="text-blue-400 text-xl">📈</span>
          </div>
          <p className="text-xl font-bold text-white mb-2">
            {selectedCollection?.collection.volume?.[selectedTimeframe]
              ? formatNumber(
                  selectedCollection.collection.volume[selectedTimeframe]
                )
              : "N/A"}
          </p>
          {selectedCollection?.collection.volumeChange?.[selectedTimeframe] !==
            undefined && (
            <span
              className={`text-xs ${getVolumeChangeColor(
                selectedCollection.collection.volumeChange[selectedTimeframe]
              )}`}
            >
              {getVolumeChangeIcon(
                selectedCollection.collection.volumeChange[selectedTimeframe]
              )}
              {(
                selectedCollection.collection.volumeChange[selectedTimeframe] *
                100
              ).toFixed(1)}
              %
            </span>
          )}
        </div>

        {/* Rank */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-300 font-semibold text-sm">Rank</h3>
            <span className="text-purple-400 text-xl">🏆</span>
          </div>
          <p className="text-xl font-bold text-white mb-2">
            #{" "}
            {selectedCollection?.collection.rank?.[selectedTimeframe] || "N/A"}
          </p>
          <p className="text-purple-300 text-xs">
            All Time: #{selectedCollection?.collection.rank?.allTime || "N/A"}
          </p>
        </div>

        {/* Floor Sale */}
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl border border-orange-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-orange-300 font-semibold text-sm">
              Floor Sale
            </h3>
            <span className="text-orange-400 text-xl">🔥</span>
          </div>
          <p className="text-xl font-bold text-white mb-2">
            {selectedCollection?.collection.floorSale?.[selectedTimeframe] ?? 0}{" "}
            MON
          </p>
          <p className="text-orange-300 text-xs">Last {selectedTimeframe}</p>
        </div>

        {/* Market Cap */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl border border-green-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-green-300 font-semibold text-sm">Market Cap</h3>
            <span className="text-green-400 text-xl">💰</span>
          </div>
          <p className="text-xl font-bold text-white mb-2">
            {selectedCollection.collection.floorAskPrice?.amount?.decimal &&
            selectedCollection.ownership.tokenCount
              ? selectedCollection.collection.floorAskPrice?.amount?.decimal *
                parseInt(selectedCollection.ownership.tokenCount)
              : 0}{" "}
            MONs
          </p>
          <p className="text-green-300 text-xs">Est. Total Value</p>
        </div>
      </div>
    </div>
  );
}
