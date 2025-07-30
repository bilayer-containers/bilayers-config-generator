// src/components/LeftPanel.jsx
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import InputItem from "./InputItem";
import OutputItem from "./OutputItem";
import ParameterItem from "./ParameterItem";
import DisplayOnlyItem from "./DisplayOnlyItem";
import CitationItem from "./CitationItem";
import DockerImageItem from "./DockerImageItem";
import AlgorithmFolderItem from "./AlgorithmFolderItem";
import ExecFunctionItem from "./ExecFunctionItem";
import yaml from "js-yaml";

export default function LeftPanel({ setYamlCode }) {
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [displayOnly, setDisplayOnly] = useState([]);
  const [citations, setCitations] = useState([]);
  const [dockerImage, setDockerImage] = useState({
    org: '',
    name: '',
    tag: '',
    platform: ''
  });
  const [algorithmFolderName, setAlgorithmFolderName] = useState('');
  const [execFunction, setExecFunction] = useState({
    name: '',
    cli_command: '',
    hidden_args: undefined
  });

  // Collapsible sections state
  const [sectionsOpen, setSectionsOpen] = useState({
    dockerImage: true,
    algorithmFolder: true,
    execFunction: true,
    inputs: true,
    outputs: true,
    parameters: true,
    displayOnly: true,
    citations: true
  });

  const toggleSection = (section) => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Add a new empty input or parameter
  const addInput = () => setInputs((prev) => [...prev, { 
    name: '', 
    type: '', 
    label: '', 
    description: '', 
    cli_tag: '',
    cli_order: 0,
    default: '',
    optional: false,
    format: [],
    folder_name: '',
    file_count: '',
    section_id: '',
    mode: ''
  }]);

  const addOutput = () => setOutputs((prev) => [...prev, { 
    name: '', 
    type: '', 
    label: '', 
    description: '', 
    cli_tag: '',
    cli_order: 0,
    default: '',
    optional: false,
    format: [],
    folder_name: '',
    file_count: '',
    section_id: '',
    mode: ''
  }]);
  
  const addParam = () => setParameters((prev) => [...prev, { 
    name: '', 
    type: '', 
    label: '', 
    description: '', 
    optional: false,
    section_id: '',
    mode: '',
    default: '',
    cli_tag: '',
    cli_order: 0
  }]);

  const addDisplayOnly = () => setDisplayOnly((prev) => [...prev, { 
    name: '', 
    type: '', 
    label: '', 
    description: '', 
    optional: false,
    section_id: '',
    mode: '',
    default: ''
  }]);

  const addCitation = () => setCitations((prev) => [...prev, {
    name: '',
    doi: '',
    license: '',
    description: ''
  }]);

  // Update input/param at index i with new data
  const updateInput = (i, newData) => {
    setInputs((prev) => prev.map((item, idx) => (idx === i ? newData : item)));
  };

  const updateOutput = (i, newData) => {
    setOutputs((prev) => prev.map((item, idx) => (idx === i ? newData : item)));
  };

  const updateParam = (i, newData) => {
    setParameters((prev) => prev.map((item, idx) => (idx === i ? newData : item)));
  };

  const updateDisplayOnly = (i, newData) => {
    setDisplayOnly((prev) => prev.map((item, idx) => (idx === i ? newData : item)));
  };

  const updateCitation = (i, newData) => {
    setCitations((prev) => prev.map((item, idx) => (idx === i ? newData : item)));
  };

  const updateDockerImage = (newData) => {
    setDockerImage(newData);
  };

  const updateAlgorithmFolderName = (newData) => {
    setAlgorithmFolderName(newData);
  };

  const updateExecFunction = (newData) => {
    setExecFunction(newData);
  };

  // Remove input/param at index i
  const removeInput = (i) => setInputs((prev) => prev.filter((_, idx) => idx !== i));
  const removeOutput = (i) => setOutputs((prev) => prev.filter((_, idx) => idx !== i));
  const removeParam = (i) => setParameters((prev) => prev.filter((_, idx) => idx !== i));
  const removeDisplayOnly = (i) => setDisplayOnly((prev) => prev.filter((_, idx) => idx !== i));
  const removeCitation = (i) => setCitations((prev) => prev.filter((_, idx) => idx !== i));

  // Update YAML on changes
  useEffect(() => {
    // Helper to determine if a value needs quotes in YAML
    const needsQuotes = (value) => {
      if (!value || typeof value !== 'string') return false;
      
      // Don't quote boolean values like True/False
      if (value === 'True' || value === 'False') return false;
      
      // Quote version numbers (digits separated by dots) - they should be strings
      if (/^\d+(\.\d+)*$/.test(value)) {
        return true;
      }
      
      // Don't quote simple words like "latest"
      if (/^[a-zA-Z]+$/.test(value)) return false;
      
      // Don't quote simple alphanumeric strings with only underscores or hyphens
      if (/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(value)) return false;
      
      // Quote everything else:
      // - Contains spaces
      // - Contains special characters (including slashes)
      // - Starts with a number followed by letters
      // - Contains mixed content
      return true;
    };

    // Build YAML data with raw values - no manual quoting
    const yamlData = {
      citations: citations.map(citation => ({
        name: citation.name || '',
        doi: citation.doi || '',
        license: citation.license || '',
        description: citation.description || ''
      })),
      docker_image: {
        org: dockerImage.org || '',
        name: dockerImage.name || '',
        tag: dockerImage.tag || '',
        platform: dockerImage.platform || ''
      },
      algorithm_folder_name: algorithmFolderName || '',
      exec_function: {
        name: execFunction.name || '',
        cli_command: execFunction.cli_command || '',
        hidden_args: execFunction.hidden_args && execFunction.hidden_args.length > 0 
          ? execFunction.hidden_args.map(arg => ({
              cli_tag: arg.cli_tag || '',
              value: arg.value || '',
              append_value: arg.append_value ? 'True' : 'False',
              cli_order: arg.cli_order || 1
            }))
          : 'EMPTY_HIDDEN_ARGS'
      },
      inputs: inputs.map(input => {
        const inputData = {
          name: input.name || '',
          type: input.type || '',
          label: input.label || '',
          description: input.description || '',
          cli_tag: input.cli_tag || '',
          cli_order: input.cli_order !== undefined ? input.cli_order : 0,
          default: input.default || '',
          optional: input.optional ? 'True' : 'False',
          format: input.format && input.format.length > 0 ? input.format.filter(f => f.trim() !== '') : [],
          folder_name: input.folder_name || '',
          file_count: input.file_count || '',
          section_id: input.section_id || '',
          mode: input.mode || ''
        };

        // Add image-specific fields only if type is image
        if (input.type === 'image') {
          inputData.subtype = input.subtype || [];
          inputData.depth = input.depth ? 'True' : 'False';
          inputData.timepoints = input.timepoints ? 'True' : 'False';
          inputData.tiled = input.tiled ? 'True' : 'False';
          inputData.pyramidal = input.pyramidal ? 'True' : 'False';
        }

        return inputData;
      }),
      outputs: outputs.map(output => {
        const outputData = {
          name: output.name || '',
          type: output.type || '',
          label: output.label || '',
          description: output.description || '',
          cli_tag: output.cli_tag || '',
          cli_order: output.cli_order !== undefined ? output.cli_order : 0,
          default: output.default || '',
          optional: output.optional ? 'True' : 'False',
          format: output.format && output.format.length > 0 ? output.format.filter(f => f.trim() !== '') : [],
          folder_name: output.folder_name || '',
          file_count: output.file_count || '',
          section_id: output.section_id || '',
          mode: output.mode || ''
        };

        // Add image-specific fields only if type is image
        if (output.type === 'image') {
          outputData.subtype = output.subtype || [];
          outputData.depth = output.depth ? 'True' : 'False';
          outputData.timepoints = output.timepoints ? 'True' : 'False';
          outputData.tiled = output.tiled ? 'True' : 'False';
          outputData.pyramidal = output.pyramidal ? 'True' : 'False';
        }

        return outputData;
      }),
      parameters: parameters.map(param => {
        const paramData = {
          name: param.name || '',
          type: param.type || '',
          label: param.label || '',
          description: param.description || '',
          optional: param.optional ? 'True' : 'False',
          section_id: param.section_id || '',
          mode: param.mode || '',
          default: param.default || '',
          cli_tag: param.cli_tag || '',
          cli_order: param.cli_order !== undefined ? param.cli_order : 0
        };

        // Add type-specific fields based on parameter type
        if (param.type === 'checkbox') {
          paramData.append_value = param.append_value ? 'True' : 'False';
        } else if (param.type === 'textbox') {
          paramData.output_dir_set = param.output_dir_set ? 'True' : 'False';
        } else if (param.type === 'radio' || param.type === 'dropdown') {
          paramData.options = param.options || [];
          if (param.type === 'dropdown') {
            paramData.multiselect = param.multiselect ? 'True' : 'False';
          }
        }

        return paramData;
      }),
      display_only: displayOnly.map(displayItem => {
        const displayData = {
          name: displayItem.name || '',
          type: displayItem.type || '',
          label: displayItem.label || '',
          description: displayItem.description || '',
          optional: displayItem.optional ? 'True' : 'False',
          section_id: displayItem.section_id || '',
          mode: displayItem.mode || '',
          default: displayItem.default || ''
        };

        // Add type-specific fields based on display item type (same as parameters but no CLI fields)
        if (displayItem.type === 'checkbox') {
          displayData.append_value = displayItem.append_value ? 'True' : 'False';
        } else if (displayItem.type === 'textbox') {
          displayData.output_dir_set = displayItem.output_dir_set ? 'True' : 'False';
        } else if (displayItem.type === 'radio' || displayItem.type === 'dropdown') {
          displayData.options = displayItem.options || [];
          if (displayItem.type === 'dropdown') {
            displayData.multiselect = displayItem.multiselect ? 'True' : 'False';
          }
        }

        return displayData;
      })
    };
    
    // Convert to YAML string manually with proper quoting
    const yamlString = yaml.dump(yamlData, { 
      sortKeys: false,
      quotingType: '"',
      forceQuotes: false
    });
    
    // Post-process the YAML to fix quoting issues
    const lines = yamlString.split('\n');
    const processedLines = lines.map(line => {
      // Handle special case for empty hidden_args
      if (line.includes('EMPTY_HIDDEN_ARGS')) {
        const match = line.match(/^(\s*)(hidden_args):/);
        if (match) {
          const [, indent] = match;
          return `${indent}hidden_args:`;
        }
      }
      
      // Match lines with key: value pattern - be more specific about key matching
      const match = line.match(/^(\s*)([a-zA-Z_][a-zA-Z0-9_]*):(.*)$/);
      if (match) {
        const [, indent, key, valueWithSpace] = match;
        const value = valueWithSpace.trim();
        // Remove existing quotes and check if we need them
        const cleanValue = value.replace(/^["']|["']$/g, '');
        if (cleanValue && needsQuotes(cleanValue)) {
          return `${indent}${key}: "${cleanValue}"`;
        } else {
          return `${indent}${key}: ${cleanValue}`;
        }
      }
      return line;
    });
    
    // Add line spacing between top-level sections
    const finalLines = [];
    const topLevelSections = ['citations:', 'docker_image:', 'algorithm_folder_name:', 'exec_function:', 'inputs:', 'outputs:', 'parameters:', 'display_only:'];
    
    for (let i = 0; i < processedLines.length; i++) {
      const line = processedLines[i];
      
      // Add the current line
      finalLines.push(line);
      
      // Check if this line starts a top-level section and it's not the last section
      if (topLevelSections.some(section => line.startsWith(section))) {
        // Look ahead to find the next top-level section
        let nextSectionIndex = -1;
        for (let j = i + 1; j < processedLines.length; j++) {
          if (topLevelSections.some(section => processedLines[j].startsWith(section))) {
            nextSectionIndex = j;
            break;
          }
        }
        
        // If there's a next section, add a blank line before it
        if (nextSectionIndex !== -1) {
          // Skip to just before the next section
          while (i + 1 < nextSectionIndex) {
            i++;
            finalLines.push(processedLines[i]);
          }
          // Add blank line before next section
          if (i + 1 < processedLines.length) {
            finalLines.push('');
          }
        }
      }
    }
    
    const finalYaml = finalLines.join('\n');
    setYamlCode(finalYaml);
  }, [dockerImage, algorithmFolderName, execFunction, inputs, outputs, parameters, displayOnly, citations, setYamlCode]);

  return (
    <div className="space-y-8">
      {/* Citations Section */}
      <div>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('citations')}
        >
          <h2 className="text-xl font-bold">Citations</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addCitation();
              }}
              className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              + Add Citation
            </button>
            {sectionsOpen.citations ? (
              <ChevronUp className="text-white" size={20} />
            ) : (
              <ChevronDown className="text-white" size={20} />
            )}
          </div>
        </div>
        {sectionsOpen.citations && (
          <div>
            {citations.map((item, i) => (
              <CitationItem
                key={`citation-${i}`}
                index={i}
                data={item}
                onChange={(i, data) => updateCitation(i, data)}
                remove={removeCitation}
              />
            ))}
          </div>
        )}
      </div>

      {/* Docker Image Section */}
      <div>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('dockerImage')}
        >
          <h2 className="text-xl font-bold">Docker Image</h2>
          {sectionsOpen.dockerImage ? (
            <ChevronUp className="text-white" size={20} />
          ) : (
            <ChevronDown className="text-white" size={20} />
          )}
        </div>
        {sectionsOpen.dockerImage && (
          <DockerImageItem
            data={dockerImage}
            onChange={updateDockerImage}
          />
        )}
      </div>

      {/* Algorithm Folder Section */}
      <div>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('algorithmFolder')}
        >
          <h2 className="text-xl font-bold">Algorithm Folder</h2>
          {sectionsOpen.algorithmFolder ? (
            <ChevronUp className="text-white" size={20} />
          ) : (
            <ChevronDown className="text-white" size={20} />
          )}
        </div>
        {sectionsOpen.algorithmFolder && (
          <AlgorithmFolderItem
            data={algorithmFolderName}
            onChange={updateAlgorithmFolderName}
          />
        )}
      </div>

      {/* Exec Function Section */}
      <div>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('execFunction')}
        >
          <h2 className="text-xl font-bold">Exec Function</h2>
          {sectionsOpen.execFunction ? (
            <ChevronUp className="h-5 w-5 text-white/60" />
          ) : (
            <ChevronDown className="h-5 w-5 text-white/60" />
          )}
        </div>
        {sectionsOpen.execFunction && (
          <ExecFunctionItem
            data={execFunction}
            onChange={updateExecFunction}
          />
        )}
      </div>

      {/* Inputs Section */}
      <div>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('inputs')}
        >
          <h2 className="text-xl font-bold">Inputs</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addInput();
              }}
              className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              + Add Input
            </button>
            {sectionsOpen.inputs ? (
              <ChevronUp className="text-white" size={20} />
            ) : (
              <ChevronDown className="text-white" size={20} />
            )}
          </div>
        </div>
        {sectionsOpen.inputs && (
          <div>
            {inputs.map((item, i) => (
              <InputItem
                key={`input-${i}`}
                index={i}
                data={item}
                onChange={(i, data) => updateInput(i, data)}
                remove={removeInput}
              />
            ))}
          </div>
        )}
      </div>

      {/* Outputs Section */}
      <div>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('outputs')}
        >
          <h2 className="text-xl font-bold">Outputs</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addOutput();
              }}
              className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              + Add Output
            </button>
            {sectionsOpen.outputs ? (
              <ChevronUp className="text-white" size={20} />
            ) : (
              <ChevronDown className="text-white" size={20} />
            )}
          </div>
        </div>
        {sectionsOpen.outputs && (
          <div>
            {outputs.map((item, i) => (
              <OutputItem
                key={`output-${i}`}
                index={i}
                data={item}
                onChange={(i, data) => updateOutput(i, data)}
                remove={removeOutput}
              />
            ))}
          </div>
        )}
      </div>

      {/* Parameters Section */}
      <div>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('parameters')}
        >
          <h2 className="text-xl font-bold">Parameters</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addParam();
              }}
              className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              + Add Parameter
            </button>
            {sectionsOpen.parameters ? (
              <ChevronUp className="text-white" size={20} />
            ) : (
              <ChevronDown className="text-white" size={20} />
            )}
          </div>
        </div>
        {sectionsOpen.parameters && (
          <div>
            {parameters.map((item, i) => (
              <ParameterItem
                key={`param-${i}`}
                index={i}
                data={item}
                onChange={(i, data) => updateParam(i, data)}
                remove={removeParam}
              />
            ))}
          </div>
        )}
      </div>

      {/* Display Only Section */}
      <div>
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('displayOnly')}
        >
          <h2 className="text-xl font-bold">Display Only</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addDisplayOnly();
              }}
              className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              + Add Display Only
            </button>
            {sectionsOpen.displayOnly ? (
              <ChevronUp className="text-white" size={20} />
            ) : (
              <ChevronDown className="text-white" size={20} />
            )}
          </div>
        </div>
        {sectionsOpen.displayOnly && (
          <div>
            {displayOnly.map((item, i) => (
              <DisplayOnlyItem
                key={`display-${i}`}
                index={i}
                data={item}
                onChange={(i, data) => updateDisplayOnly(i, data)}
                remove={removeDisplayOnly}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}