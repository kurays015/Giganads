import CollectionTabs from "@/components/CollectionTabs";
import { useDashboard } from "@/contexts/DashboardContext";

export default function Collections() {
  const { selectedCollection } = useDashboard();
  return (
    <div className="flex-1 overflow-y-auto">
      {selectedCollection ? (
        <div className="p-6">
          <CollectionTabs />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-lg">
            Select a collection to view details
          </p>
        </div>
      )}
    </div>
  );
}
