import { useSandpack } from "@codesandbox/sandpack-react";

export function ActiveFileDisplay() {
  const { sandpack } = useSandpack();
  const handleActiveFile = (currentFile: string) => {
    sandpack.setActiveFile(currentFile);
  };
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {sandpack.visibleFiles.map((file) => (
        <button
          key={file}
          onClick={() => handleActiveFile(file)}
          className="p-2"
          style={{
            color: sandpack.activeFile === file ? "white" : "gray",
          }}
        >
          {file}
        </button>
      ))}
    </div>
  );
}
