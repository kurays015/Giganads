import { useDashboard } from "@/contexts/DashboardContext";

export default function SidebarHeader() {
  const { collections, portfolioValue } = useDashboard();

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-base font-bold text-white">
        Collections ({collections.length})
      </h2>
      <div className="text-right">
        <p className="text-gray-300 text-xs">Portfolio</p>
        <p className="text-green-400 font-bold text-sm">
          {portfolioValue.toFixed(2)} MON
        </p>
      </div>
    </div>
  );
}
