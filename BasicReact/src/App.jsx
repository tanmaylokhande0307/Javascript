import { useState } from "react";

function App() {
  const [board, setBoard] = useState([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
  ]);

  return (
    <div className="flex justify-center items-center border border-amber-500 h-[100%] w-[100vw]">
      hi
    </div>
  );
}

export default App;
