import { useState } from "react";
import YAMLPanel from "./components/ConfigEditor/YAMLPanel";
import LeftPanel from "./components/ConfigEditor/LeftPanel";

function App() {
  const [yamlCode, setYamlCode] = useState("");

  return (
    <div className="flex h-screen text-white bg-gradient-to-br from-slate-800 to-gray-900">
      {/* Left Panel */}
      <div className="w-1/2 p-6 overflow-y-auto space-y-6 glass-magenta">
        <LeftPanel setYamlCode={setYamlCode} />
      </div>

      {/* Right Panel */}
      <div className="w-1/2 p-6 bg-white/5 glass">
        <YAMLPanel yamlCode={yamlCode} setYamlCode={setYamlCode} />
      </div>
    </div>
  );
}

export default App;