import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function CitationItem({ index, data, onChange, remove }) {
  const [formData, setFormData] = useState(data);
  const [showCustomLicense, setShowCustomLicense] = useState(false);

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(index, newData);
  };

  const handleLicenseChange = (value) => {
    if (value === 'Other') {
      setShowCustomLicense(true);
      // Don't set the license to "Other", wait for custom input
    } else {
      setShowCustomLicense(false);
      handleChange('license', value);
    }
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg mb-3 backdrop-blur-sm border border-white/20">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-white/80">Citation {index + 1}</h3>
        <button
          onClick={() => remove(index)}
          className="text-red-400 hover:text-red-300 p-1"
          title="Remove citation"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Stardist_2018, YOLOv5_2020"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">DOI</label>
          <input
            type="text"
            value={formData.doi || ''}
            onChange={(e) => handleChange('doi', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. 10.1007/978-3-030-00934-2_30"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">License</label>
          <select
            value={showCustomLicense ? 'Other' : (formData.license || '')}
            onChange={(e) => handleLicenseChange(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select license</option>
            <option value="MIT">MIT</option>
            <option value="Apache-2.0">Apache-2.0</option>
            <option value="BSD-3-Clause">BSD-3-Clause</option>
            <option value="BSD-2-Clause">BSD-2-Clause</option>
            <option value="GPL-3.0">GPL-3.0</option>
            <option value="GPL-2.0">GPL-2.0</option>
            <option value="LGPL-3.0">LGPL-3.0</option>
            <option value="CC-BY-4.0">CC-BY-4.0</option>
            <option value="CC-BY-SA-4.0">CC-BY-SA-4.0</option>
            <option value="Proprietary">Proprietary</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {showCustomLicense && (
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">Custom License</label>
            <input
              type="text"
              value={formData.license || ''}
              onChange={(e) => handleChange('license', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter custom license name"
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Brief description of what this citation/method does"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}
