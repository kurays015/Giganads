interface PriceAlertModalProps {
  showAlertForm: boolean;
  setShowAlertForm: (show: boolean) => void;
  newAlert: {
    targetPrice: string;
    condition: "above" | "below";
  };
  setNewAlert: (alert: {
    targetPrice: string;
    condition: "above" | "below";
  }) => void;
  addPriceAlert: () => void;
}

export default function PriceAlertModal({
  showAlertForm,
  setShowAlertForm,
  newAlert,
  setNewAlert,
  addPriceAlert,
}: PriceAlertModalProps) {
  if (!showAlertForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 w-96">
        <h3 className="text-xl font-bold text-white mb-4">Set Price Alert</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Target Price (MON)
            </label>
            <input
              type="number"
              value={newAlert.targetPrice}
              onChange={e =>
                setNewAlert({ ...newAlert, targetPrice: e.target.value })
              }
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400"
              placeholder="Enter target price"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Condition
            </label>
            <select
              value={newAlert.condition}
              onChange={e =>
                setNewAlert({
                  ...newAlert,
                  condition: e.target.value as "above" | "below",
                })
              }
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={addPriceAlert}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
            >
              Set Alert
            </button>
            <button
              onClick={() => setShowAlertForm(false)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
