import Image from "next/image";
import { Collection } from "@/types/collection";

interface SidebarProps {
  collections: Collection[];
  selectedCollection: Collection | null;
  setSelectedCollection: (collection: Collection) => void;
  selectedCollectionsForComparison: string[];
  toggleCollectionComparison: (collectionId: string) => void;
  portfolioValue: number;
}

export default function Sidebar({
  collections,
  selectedCollection,
  setSelectedCollection,
  selectedCollectionsForComparison,
  toggleCollectionComparison,
  portfolioValue,
}: SidebarProps) {
  const filteredCollections = collections.filter(
    c => !c.collection.name.includes("0x")
  );

  return (
    <div className="w-80 bg-black/20 backdrop-blur-sm border-r border-white/10 overflow-y-auto h-full">
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-white">
            Collections ({filteredCollections.length})
          </h2>
          <div className="text-right">
            <p className="text-gray-300 text-xs">Portfolio</p>
            <p className="text-green-400 font-bold text-sm">
              {portfolioValue.toFixed(2)} MON
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCollections.map(collection => (
            <div
              key={collection.collection.id}
              onClick={() => setSelectedCollection(collection)}
              className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center gap-4 mb-4 shadow-sm hover:shadow-lg ${
                selectedCollection?.collection?.id ===
                collection?.collection?.id
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
                onError={e => {
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
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  toggleCollectionComparison(collection.collection.id);
                }}
                className={`ml-2 w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                  selectedCollectionsForComparison.includes(
                    collection.collection.id
                  )
                    ? "border-blue-500 bg-blue-500/30"
                    : "border-gray-500 bg-transparent hover:bg-gray-700"
                }`}
                title="Toggle compare"
              >
                {selectedCollectionsForComparison.includes(
                  collection.collection.id
                ) ? (
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
