import { useSandpack } from "@codesandbox/sandpack-react";
import { files } from "./InitialFiles";

export function EditorPanel() {
  const { sandpack } = useSandpack();

  const handleSave = () => {
    const filesToSave = {
      "/App.tsx": sandpack.files["/App.tsx"],
      "/style.css": sandpack.files["/style.css"],
    };
    localStorage.setItem("savedFiles", JSON.stringify(filesToSave));
  };

  const handleReset = () => {
    sandpack.updateFile({
      "/App.tsx": files["/App.tsx"],
      "/style.css": files["/style.css"],
    });
    localStorage.removeItem("savedFiles");
  };

  return (
    <div>
      <button
        onClick={handleSave}
        className="p-2 text-[#e3e6e8] hover:text-white"
      >
        💾 Save
      </button>
      <button
        onClick={handleReset}
        className="p-2 text-[#e3e6e8] hover:text-white"
      >
        Reset
      </button>
    </div>
  );
}
