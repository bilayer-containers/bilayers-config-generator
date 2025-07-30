import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

export default function OutputItem({ index, data, onChange, remove }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    
    // If type changes to/from image, handle conditional fields
    if (field === 'type') {
      if (value === 'image') {
        // Add image-specific fields with default values
        newData.subtype = newData.subtype || [];
        newData.depth = newData.depth !== undefined ? newData.depth : false;
        newData.timepoints = newData.timepoints !== undefined ? newData.timepoints : false;
        newData.tiled = newData.tiled !== undefined ? newData.tiled : false;
        newData.pyramidal = newData.pyramidal !== undefined ? newData.pyramidal : false;
      } else {
        // Remove image-specific fields
        delete newData.subtype;
        delete newData.depth;
        delete newData.timepoints;
        delete newData.tiled;
        delete newData.pyramidal;
      }
    }
    
    setFormData(newData);
    onChange(index, newData);
  };

  const toggleSubtype = (subtypeValue) => {
    const currentSubtypes = formData.subtype || [];
    const newSubtypes = currentSubtypes.includes(subtypeValue)
      ? currentSubtypes.filter(s => s !== subtypeValue)
      : [...currentSubtypes, subtypeValue];
    handleChange('subtype', newSubtypes);
  };

  const addFormat = () => {
    const currentFormats = formData.format || [];
    handleChange('format', [...currentFormats, '']);
  };

  const updateFormat = (formatIndex, value) => {
    const currentFormats = [...(formData.format || [])];
    currentFormats[formatIndex] = value;
    handleChange('format', currentFormats);
  };

  const removeFormat = (formatIndex) => {
    const currentFormats = formData.format || [];
    const newFormats = currentFormats.filter((_, i) => i !== formatIndex);
    handleChange('format', newFormats);
  };

  const typeOptions = ['image', 'measurement', 'array', 'executable', 'file'];
  const fileCountOptions = ['single', 'multiple'];
  const subtypeOptions = ['grayscale', 'color', 'binary', 'labeled'];

  return (
    <div className="bg-white/10 p-4 rounded-lg mb-3 backdrop-blur-sm border border-white/20">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-white/80">Output #{index + 1}</h3>
        <button
          onClick={() => remove(index)}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Basic Fields */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. output_dir"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Type</label>
          <select
            value={formData.type || ''}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select type</option>
            {typeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-white/70 mb-1">Label</label>
          <input
            type="text"
            value={formData.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Output Image Directory"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-white/70 mb-1">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Path to the directory where output images will be saved"
            rows={2}
          />
        </div>

        {/* Conditional Subtype Field - Only for image type */}
        {formData.type === 'image' && (
          <div className="col-span-2">
            <label className="block text-sm font-medium text-white/70 mb-2">Subtype</label>
            <div className="grid grid-cols-2 gap-2">
              {subtypeOptions.map(subtype => (
                <label key={subtype} className="flex items-center text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={(formData.subtype || []).includes(subtype)}
                    onChange={() => toggleSubtype(subtype)}
                    className="mr-2 rounded"
                  />
                  {subtype}
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">CLI Tag</label>
          <input
            type="text"
            value={formData.cli_tag || ''}
            onChange={(e) => handleChange('cli_tag', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. --output-dir"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">CLI Order</label>
          <input
            type="number"
            value={formData.cli_order !== undefined ? formData.cli_order : ''}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || value === '-') {
                handleChange('cli_order', value === '' ? 0 : value);
              } else {
                const numValue = parseInt(value);
                handleChange('cli_order', isNaN(numValue) ? 0 : numValue);
              }
            }}
            onFocus={(e) => e.target.select()}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. 0, -1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Default</label>
          <select
            value={formData.default || ''}
            onChange={(e) => handleChange('default', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select default</option>
            <option value="single">Single</option>
            <option value="directory">Directory</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Optional</label>
          <select
            value={formData.optional}
            onChange={(e) => handleChange('optional', e.target.value === 'true')}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={false}>False</option>
            <option value={true}>True</option>
          </select>
        </div>

        {/* Format Field - Multiple values */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-white/70">Format</label>
            <button
              onClick={addFormat}
              className="flex items-center gap-1 px-2 py-1 bg-indigo-600/20 text-indigo-300 rounded-md hover:bg-indigo-600/30 transition-colors text-xs"
            >
              <Plus size={12} />
              Add Format
            </button>
          </div>
          {formData.format && formData.format.length > 0 ? (
            <div className="space-y-2">
              {formData.format.map((fmt, fmtIndex) => (
                <div key={fmtIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={fmt}
                    onChange={(e) => updateFormat(fmtIndex, e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. tiff, png, jpg"
                  />
                  <button
                    onClick={() => removeFormat(fmtIndex)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/50 italic">No formats configured. Click "Add Format" to add one.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Folder Name</label>
          <input
            type="text"
            value={formData.folder_name || ''}
            onChange={(e) => handleChange('folder_name', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. /bilayers/output_images"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">File Count</label>
          <select
            value={formData.file_count || ''}
            onChange={(e) => handleChange('file_count', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select count</option>
            {fileCountOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Section ID</label>
          <input
            type="text"
            value={formData.section_id || ''}
            onChange={(e) => handleChange('section_id', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. outputs"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Mode</label>
          <select
            value={formData.mode || ''}
            onChange={(e) => handleChange('mode', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select mode</option>
            <option value="beginner">Beginner</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Conditional Boolean Fields - Only for image type */}
        {formData.type === 'image' && (
          <>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Depth</label>
              <select
                value={formData.depth}
                onChange={(e) => handleChange('depth', e.target.value === 'true')}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Timepoints</label>
              <select
                value={formData.timepoints}
                onChange={(e) => handleChange('timepoints', e.target.value === 'true')}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Tiled</label>
              <select
                value={formData.tiled}
                onChange={(e) => handleChange('tiled', e.target.value === 'true')}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Pyramidal</label>
              <select
                value={formData.pyramidal}
                onChange={(e) => handleChange('pyramidal', e.target.value === 'true')}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={false}>False</option>
                <option value={true}>True</option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
