import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { ActiveFileDisplay } from "./ActiveFileDisplay";
import FormatButton from "./FormatButton";
import { useEffect, useRef, useState } from "react";
import { files } from "./InitialFiles";
import { EditorPanel } from "./EditorPanel";

const App = () => {
  const [editorWidth, setEditorWidth] = useState(50); // percentage
  const isDragging = useRef(false);
  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const [initialFiles, setInitialFiles] = useState<null | typeof files>(null);
  useEffect(() => {
    const saved = localStorage.getItem("savedFiles");
    if (saved) {
      try {
        setInitialFiles(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved files:", e);
      }
    } else {
      setInitialFiles({
        "/App.tsx": files["/App.tsx"],
        "/style.css": files["/style.css"],
        "/main.tsx": files["/main.tsx"], // keep these
        "/index.html": files["/index.html"],
      });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const containerWidth = window.innerWidth;
      const newWidth = (e.clientX / containerWidth) * 100;
      if (newWidth > 10 && newWidth < 90) {
        setEditorWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  if (!initialFiles) return null;
  return (
    <SandpackProvider
      template="react-ts"
      theme={"dark"}
      files={initialFiles}
      customSetup={{
        entry: "/main.tsx",
        dependencies: {
          motion: "latest",
        },
      }}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
        recompileMode: "delayed",
        recompileDelay: 500,
      }}
    >
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <SandpackLayout style={{ flex: 1 }}>
          <div
            style={{
              width: `${editorWidth}%`,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <ActiveFileDisplay />
              <div style={{ display: "flex", gap: "6px" }}>
                <EditorPanel />
                <FormatButton />
              </div>
            </div>
            <SandpackCodeEditor
              style={{ height: "100%", flex: 1, overflowY: "auto" }}
              showLineNumbers
              showTabs={false}
              wrapContent
            />
          </div>

          <div
            onMouseDown={handleMouseDown}
            style={{
              width: "5px",
              cursor: "col-resize",
              background: "#555",
              zIndex: 10,
            }}
          />

          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            showNavigator
            style={{ height: "100%", flex: 1 }}
          />
        </SandpackLayout>
      </div>
    </SandpackProvider>
  );
};

export default App;
