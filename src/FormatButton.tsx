import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserHtml from "prettier/plugins/html";
import parserPostcss from "prettier/plugins/postcss";
import parserTypeScript from "prettier/plugins/typescript";
import estreePlugin from "prettier/plugins/estree";

import { useCallback, useState } from "react";
import { useSandpack, useActiveCode } from "@codesandbox/sandpack-react";

const FormatButton = () => {
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();
  const [isLoading, setIsLoading] = useState(false);

  const formatCode = useCallback(async () => {
    setIsLoading(true);
    try {
      const activeFile = sandpack.activeFile;
      let parser;

      if (activeFile.endsWith(".js") || activeFile.endsWith(".jsx")) {
        parser = "babel";
      } else if (activeFile.endsWith(".ts") || activeFile.endsWith(".tsx")) {
        parser = "typescript";
      } else if (activeFile.endsWith(".html")) {
        parser = "html";
      } else if (activeFile.endsWith(".css")) {
        parser = "css";
      } else {
        throw new Error("Unsupported file format");
      }

      const formattedCode = await prettier.format(code, {
        parser,
        plugins: [
          parserBabel,
          parserTypeScript,
          parserHtml,
          parserPostcss,
          estreePlugin,
        ],
        semi: true,
        singleQuote: true,
        trailingComma: "all",
        printWidth: 80,
        tabWidth: 2,
      });

      updateCode(formattedCode);
    } catch (error) {
      console.error("Formatting error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [code, sandpack, updateCode]);

  return (
    <button
      onClick={formatCode}
      disabled={isLoading}
      className="p-2 text-[#e3e6e8] hover:text-white"
    >
      {isLoading ? "Formatting..." : "Format Code"}
    </button>
  );
};

export default FormatButton;
