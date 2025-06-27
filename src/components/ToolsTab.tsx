"use client";

import { useDashboard } from "@/contexts/DashboardContext";

export default function ToolsTab() {
  const { collections, portfolioValue } = useDashboard();

  return (
    <div className="space-y-6">
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
              {collections.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4">
            <p className="text-purple-300 text-xs">Total NFTs</p>
            <p className="text-white font-bold text-base">
              {collections.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
