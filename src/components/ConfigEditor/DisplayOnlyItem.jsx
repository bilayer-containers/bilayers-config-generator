import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

export default function DisplayOnlyItem({ index, data, onChange, remove }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    
    // If type changes, handle conditional fields
    if (field === 'type') {
      // Remove all type-specific fields first
      delete newData.append_value;
      delete newData.output_dir_set;
      delete newData.options;
      delete newData.multiselect;
      
      // Add type-specific fields with default values
      if (value === 'checkbox') {
        newData.append_value = false;
      } else if (value === 'textbox') {
        newData.output_dir_set = false;
      } else if (value === 'radio' || value === 'dropdown') {
        newData.options = [];
        if (value === 'dropdown') {
          newData.multiselect = false;
        }
      }
    }
    
    setFormData(newData);
    onChange(index, newData);
  };

  const addOption = () => {
    const currentOptions = formData.options || [];
    handleChange('options', [...currentOptions, { label: '', value: '' }]);
  };

  const updateOption = (optionIndex, field, value) => {
    const currentOptions = [...(formData.options || [])];
    currentOptions[optionIndex] = { ...currentOptions[optionIndex], [field]: value };
    handleChange('options', currentOptions);
  };

  const removeOption = (optionIndex) => {
    const currentOptions = formData.options || [];
    const newOptions = currentOptions.filter((_, i) => i !== optionIndex);
    handleChange('options', newOptions);
  };

  const typeOptions = ['checkbox', 'integer', 'float', 'textbox', 'radio', 'dropdown'];

  return (
    <div className="bg-white/10 p-4 rounded-lg mb-3 backdrop-blur-sm border border-white/20">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-white/80">Display Only #{index + 1}</h3>
        <button
          onClick={() => remove(index)}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Mandatory Basic Fields */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. info_display"
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
            placeholder="e.g. Information Display"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-white/70 mb-1">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Display information for user"
            rows={2}
          />
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

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Section ID</label>
          <input
            type="text"
            value={formData.section_id || ''}
            onChange={(e) => handleChange('section_id', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. display_only"
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

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Default</label>
          <input
            type="text"
            value={formData.default || ''}
            onChange={(e) => handleChange('default', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. default value"
          />
        </div>

        {/* Conditional Fields Based on Type */}
        
        {/* Checkbox Type - append_value */}
        {formData.type === 'checkbox' && (
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">Append Value</label>
            <select
              value={formData.append_value}
              onChange={(e) => handleChange('append_value', e.target.value === 'true')}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={false}>False</option>
              <option value={true}>True</option>
            </select>
          </div>
        )}

        {/* Textbox Type - output_dir_set */}
        {formData.type === 'textbox' && (
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">Output Dir Set</label>
            <select
              value={formData.output_dir_set}
              onChange={(e) => handleChange('output_dir_set', e.target.value === 'true')}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={false}>False</option>
              <option value={true}>True</option>
            </select>
          </div>
        )}

        {/* Dropdown Type - multiselect */}
        {formData.type === 'dropdown' && (
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">Multiselect</label>
            <select
              value={formData.multiselect}
              onChange={(e) => handleChange('multiselect', e.target.value === 'true')}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={false}>False</option>
              <option value={true}>True</option>
            </select>
          </div>
        )}

        {/* Options Field - Radio and Dropdown types */}
        {(formData.type === 'radio' || formData.type === 'dropdown') && (
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-white/70">Options</label>
              <button
                onClick={addOption}
                className="flex items-center gap-1 px-2 py-1 bg-indigo-600/20 text-indigo-300 rounded-md hover:bg-indigo-600/30 transition-colors text-xs"
              >
                <Plus size={12} />
                Add Option
              </button>
            </div>
            {formData.options && formData.options.length > 0 ? (
              <div className="space-y-2">
                {formData.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="grid grid-cols-5 gap-2 items-center">
                    <div className="col-span-2">
                      <input
                        type="text"
                        value={option.label || ''}
                        onChange={(e) => updateOption(optionIndex, 'label', e.target.value)}
                        className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Label (e.g. GRAY)"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        value={option.value || ''}
                        onChange={(e) => updateOption(optionIndex, 'value', e.target.value)}
                        className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Value (e.g. 0)"
                      />
                    </div>
                    <button
                      onClick={() => removeOption(optionIndex)}
                      className="text-red-400 hover:text-red-300 transition-colors justify-self-center"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/50 italic">No options configured. Click "Add Option" to add one.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
