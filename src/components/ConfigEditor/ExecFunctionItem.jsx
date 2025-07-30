import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

export default function ExecFunctionItem({ data, onChange }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  const addHiddenArg = () => {
    const newHiddenArgs = [...(formData.hidden_args || []), {
      cli_tag: '',
      value: '',
      append_value: false,
      cli_order: 0
    }];
    handleChange('hidden_args', newHiddenArgs);
  };

  const updateHiddenArg = (index, field, value) => {
    const newHiddenArgs = [...(formData.hidden_args || [])];
    newHiddenArgs[index] = { ...newHiddenArgs[index], [field]: value };
    handleChange('hidden_args', newHiddenArgs);
  };

  const removeHiddenArg = (index) => {
    const newHiddenArgs = (formData.hidden_args || []).filter((_, i) => i !== index);
    handleChange('hidden_args', newHiddenArgs.length > 0 ? newHiddenArgs : undefined);
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg mb-3 backdrop-blur-sm border border-white/20">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-white/80">Exec Function Configuration</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. generate_cli_command"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">CLI Command</label>
          <input
            type="text"
            value={formData.cli_command || ''}
            onChange={(e) => handleChange('cli_command', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. python -m cellpose --verbose"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-white/70">Hidden Args</label>
            <button
              onClick={addHiddenArg}
              className="flex items-center gap-1 px-2 py-1 bg-indigo-600/20 text-indigo-300 rounded-md hover:bg-indigo-600/30 transition-colors text-sm"
            >
              <Plus size={14} />
              Add Arg
            </button>
          </div>
          
          {formData.hidden_args && formData.hidden_args.length > 0 && (
            <div className="space-y-3">
              {formData.hidden_args.map((arg, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-md border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/60">Hidden Arg #{index + 1}</span>
                    <button
                      onClick={() => removeHiddenArg(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-white/60 mb-1">CLI Tag</label>
                      <input
                        type="text"
                        value={arg.cli_tag || ''}
                        onChange={(e) => updateHiddenArg(index, 'cli_tag', e.target.value)}
                        className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="e.g. --save_png"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Value</label>
                      <input
                        type="text"
                        value={arg.value || ''}
                        onChange={(e) => updateHiddenArg(index, 'value', e.target.value)}
                        className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="e.g. True"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Append Value</label>
                      <select
                        value={arg.append_value}
                        onChange={(e) => updateHiddenArg(index, 'append_value', e.target.value === 'true')}
                        className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value={false}>False</option>
                        <option value={true}>True</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-white/60 mb-1">CLI Order</label>
                      <input
                        type="number"
                        value={arg.cli_order !== undefined ? arg.cli_order : ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || value === '-') {
                            // Allow empty field or just the minus sign while typing
                            updateHiddenArg(index, 'cli_order', value === '' ? 0 : value);
                          } else {
                            const numValue = parseInt(value);
                            updateHiddenArg(index, 'cli_order', isNaN(numValue) ? 0 : numValue);
                          }
                        }}
                        onFocus={(e) => {
                          // Select all text when focused, making it easier to replace
                          e.target.select();
                        }}
                        className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="e.g. 1, -1, 0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {(!formData.hidden_args || formData.hidden_args.length === 0) && (
            <p className="text-sm text-white/50 italic">No hidden args configured. Click "Add Arg" to add one.</p>
          )}
        </div>

        <div className="mt-4 p-3 bg-white/5 rounded-md">
          <p className="text-xs text-white/60">
            <strong>Preview:</strong><br />
            name: {formData.name || 'generate_cli_command'}<br />
            cli_command: {formData.cli_command || 'python -m cellpose --verbose'}<br />
            {formData.hidden_args && formData.hidden_args.length > 0 && (
              <>hidden_args: {formData.hidden_args.length} item(s)</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
