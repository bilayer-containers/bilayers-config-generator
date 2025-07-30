import Editor from "@monaco-editor/react";
import { ClipboardCopy, Download } from "lucide-react";

export default function YAMLPanel({ yamlCode, setYamlCode }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yamlCode);
      alert("YAML copied to clipboard!");
    } catch (err) {
      alert("Failed to copy YAML.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([yamlCode], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "config.yaml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">YAML Editor</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded bg-blue-600 hover:bg-blue-700"
            title="Copy YAML"
          >
            <ClipboardCopy size={18} className="text-white" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded bg-green-600 hover:bg-green-700"
            title="Download config.yaml"
          >
            <Download size={18} className="text-white" />
          </button>
        </div>
      </div>

      <Editor
        height="80vh"
        defaultLanguage="yaml"
        value={yamlCode}
        theme="vs-dark"
        onChange={(value) => setYamlCode(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
}