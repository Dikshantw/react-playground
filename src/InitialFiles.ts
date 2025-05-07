export const files = {
    "/App.tsx": `import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import './style.css';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 p-4">
      <WavyBackground />
      <div className="p-4 rounded-2xl">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          React Playground
        </h1>
        <div className="flex flex-col gap-4 pt-10">
          <div className="flex gap-2 items-start">
            <CheckIcon />
            <p className="text-black dark:text-white text-base">
              Create components in Browser.
            </p>
          </div>
          <div className="flex gap-2 items-start">
            <CheckIcon />
            <p className="text-black dark:text-white text-base">
              React, Motion and Tailwind CSS integrated.
            </p>
          </div>
          <div className="flex gap-2 items-start">
            <CheckIcon />
            <p className="text-black dark:text-white text-base">
              Code Formatting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="h-5 w-5 text-neutral-600 dark:text-neutral-400 mt-0.5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  );
};

export function WavyBackground() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // Set initial dimensions
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    // Update dimensions on resize
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create 5 wavy lines with different properties
  const lines = Array.from({ length: 5 }, (_, i) => {
    const baseY = height * (0.3 + i * 0.15);
    const amplitude = 20 + i * 10;
    const period = 0.002 - i * 0.0001;

    // Generate path for wavy line
    const generatePath = () => {
      let path = \`M 0 \${baseY} \`;

      for (let x = 0; x <= width; x += 20) {
        const y = baseY + Math.sin(x * period) * amplitude;
        path += \`L \${x} \${y} \`;
      }

      return path;
    };

    return {
      id: i,
      path: generatePath(),
      color: \`rgba(\${30 + i * 40}, \${100 + i * 30}, \${200 - i * 20}, \${i === 0 ? 0.3 : 0.5})\`,
      duration: 8 + i * 2,
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg width="100%" height="100%" className="absolute inset-0">
        {lines.map((line) => (
          <motion.path
            key={line.id}
            d={line.path}
            stroke={line.color}
            strokeWidth={1 + line.id}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 0.7,
              y: [0, -10, 0, 10, 0],
            }}
            transition={{
              pathLength: { duration: 2, ease: 'easeInOut' },
              opacity: { duration: 1 },
              y: {
                duration: line.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
                repeatType: 'mirror',
              },
            }}
          />
        ))}
      </svg>
    </div>
  );
}
`,
    "/style.css": `/* Write your CSS code here */`,
    "/main.tsx": {
      code: `import React from "react";
  import { createRoot } from "react-dom/client";
  import App from "./App";
  
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);`,
      hidden: true, // optional to hide from the editor
    },
    "/index.html": {
      code: `<!DOCTYPE html>
  <html>
    <head><title>Sandpack</title></head>
    <body>
      <div id="root"></div>
      <script type="module" src="./main.tsx"></script>
    </body>
  </html>`,
      hidden: true,
    },
  };