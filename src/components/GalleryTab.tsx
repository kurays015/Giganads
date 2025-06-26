import Image from "next/image";
import { Collection } from "@/types/collection";

interface GalleryTabProps {
  selectedCollection: Collection;
}

export default function GalleryTab({ selectedCollection }: GalleryTabProps) {
  const imagesToShow =
    selectedCollection.collection.sampleImages &&
    selectedCollection.collection.sampleImages.length > 0
      ? selectedCollection.collection.sampleImages
      : [selectedCollection.collection.image];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
      <h3 className="text-lg font-bold text-white mb-6">
        {selectedCollection.collection.sampleImages &&
        selectedCollection.collection.sampleImages.length > 0
          ? "Sample NFTs"
          : "Collection Image"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {imagesToShow.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 aspect-square max-w-xs mx-auto"
          >
            <Image
              width={320}
              height={320}
              src={image}
              alt={`NFT ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ aspectRatio: "1 / 1" }}
              onError={e => {
                e.currentTarget.src = "/placeholder-nft.svg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
