import { useState } from "react";

export default function AlgorithmFolderItem({ data, onChange }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (value) => {
    setFormData(value);
    onChange(value);
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg mb-3 backdrop-blur-sm border border-white/20">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-white/80">Algorithm Folder Configuration</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Folder Name</label>
          <input
            type="text"
            value={formData || ''}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. cellpose_inference, stardist_training"
          />
        </div>

        <div className="mt-4 p-3 bg-white/5 rounded-md">
          <p className="text-xs text-white/60">
            <strong>Preview:</strong> algorithm_folder_name: "{formData || 'folder_name'}"
          </p>
        </div>
      </div>
    </div>
  );
}
