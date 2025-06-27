import Image from "next/image";
import { useDashboard } from "@/contexts/DashboardContext";

export default function GalleryTab() {
  const { selectedCollection } = useDashboard();

  if (!selectedCollection) {
    return null;
  }

  const imagesToShow =
    selectedCollection.collection.sampleImages &&
    selectedCollection.collection.sampleImages.length > 0
      ? selectedCollection.collection.sampleImages
      : [selectedCollection.collection.image];

  console.log(imagesToShow);

  // https://img.reservoir.tools/images/v2/monad-testnet/azVuA2mA5U0US0aXYexilANvFMSfaoNYFZxbWLU1E7vlrOlGVmLEnAJ2zVScVanw9VJeywPDym8yhgYy6as1%2Bw%3D%3D

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
      <h3 className="text-lg font-bold text-white mb-3">
        {selectedCollection.collection.sampleImages &&
        selectedCollection.collection.sampleImages.length > 0
          ? "Sample NFTs"
          : "Collection Image"}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {imagesToShow.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 aspect-square w-full h-full"
          >
            <div className="relative w-full h-0 pb-[100%]">
              <Image
                fill
                src={image ?? "/placeholder-nft.svg"}
                alt={`NFT ${index + 1}`}
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                priority={index === 0}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-sm">
                  {selectedCollection.collection.sampleImages &&
                  selectedCollection.collection.sampleImages.length > 0
                    ? `NFT #${index + 1}`
                    : "Collection Image"}
                </p>
                <p className="text-gray-300 text-xs">Click to view details</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
