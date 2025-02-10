import { lazy, Suspense, useState } from "react";
import "./App.css";

const LazrPreferences = lazy(() => import("./components/Preferences.tsx"));

function App() {
  const [prompt, setPrompt] = useState("");

  return (
    <>
      <div className="relative mb-12 w-[900px]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-xl"></div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What do you want to learn about?"
          className="w-full px-8 py-5 bg-gray-900/50 border-2 border-gray-800 rounded-2xl focus:outline-none focus:border-purple-500 text-3xl placeholder-gray-400 backdrop-blur-sm "
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-3 group">
          <span className="text-3xl">Generate</span>
        </button>
      </div>

      <Suspense>
        <LazrPreferences />
      </Suspense>
    </>
  );
}

export default App;
