export default function StaticHeader() {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">🎨</span>
      </div>
      <div>
        <h1 className="text-lg font-bold text-white">
          NFT Analytics Dashboard
        </h1>
        <p className="text-gray-300 text-xs">Magic Eden Collection Insights</p>
      </div>
    </div>
  );
}
