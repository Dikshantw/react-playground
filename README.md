# React Code Playground

An interactive in-browser React code editor powered by [Sandpack](https://sandpack.codesandbox.io/), featuring real-time preview, draggable layout, Tailwind CSS integration, and animated visuals using `motion`.

## ✨ Features

- ⚛️ **React + TypeScript** out of the box
- 🎨 **Tailwind CSS** styling via CDN
- 🎞️ **Animation** using `motion`
- 📦 **Live code editing** with preview
- 📐 **Resizable layout** (drag the vertical divider)
- 🧼 **Code formatting** (via integrated button)
- 🌙 **Dark mode** styling support

## 📁 Project Structure

```
src/
├── App.tsx              # Main React component with animated background
├── ActiveFileDisplay.tsx # Displays current file name in editor
├── FormatButton.tsx     # Formats code inside the editor
├── index.html           # HTML entry point
├── main.tsx             # React entry point
└── style.css            # Optional custom styling
```

## 🧪 Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sandpack React](https://sandpack.codesandbox.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

1. **Clone this repository**:

   ```bash
   git clone https://github.com/Dikshantw/react-playground.git
   cd react-code-playground
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000)

## 🛠 Customization

- Add new files to the `files` object in the Sandpack provider.
- Modify the default code inside `App.tsx`.
- Extend the editor with additional Sandpack features (e.g., file tabs, terminal).

## 🧼 Formatting

Click the **Format** button in the editor toolbar to automatically format the current file.
