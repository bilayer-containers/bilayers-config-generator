import { useState } from "react";

export default function DockerImageItem({ data, onChange }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg mb-3 backdrop-blur-sm border border-white/20">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-white/80">Docker Image Configuration</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Organization</label>
          <input
            type="text"
            value={formData.org || ''}
            onChange={(e) => handleChange('org', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. cellprofiler"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. runcellpose_no_pretrained"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Tag</label>
          <input
            type="text"
            value={formData.tag || ''}
            onChange={(e) => handleChange('tag', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. 7.0.0, latest, v1.2.3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Platform</label>
          <select
            value={formData.platform || ''}
            onChange={(e) => handleChange('platform', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select platform</option>
            <option value="linux/amd64">linux/amd64</option>
            <option value="linux/arm64/v8">linux/arm64/v8</option>
            <option value="linux/arm64">linux/arm64</option>
            <option value="linux/arm/v7">linux/arm/v7</option>
            <option value="linux/arm/v6">linux/arm/v6</option>
            <option value="windows/amd64">windows/amd64</option>
          </select>
        </div>

        <div className="mt-4 p-3 bg-white/5 rounded-md">
          <p className="text-xs text-white/60">
            <strong>Preview:</strong> {formData.org || 'org'}/{formData.name || 'name'}:{formData.tag || 'tag'}
            {formData.platform && ` --platform ${formData.platform}`}
          </p>
        </div>
      </div>
    </div>
  );
}
