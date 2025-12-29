import { useState } from "react";
import { useSelector } from "react-redux";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleClick = (value) => {
    setDisplay((prev) => prev + value);
  };

  const clear = () => setDisplay("");

  const calculate = () => {
    try {
      // Safe eval
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${display})`)();
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  const btnBase =
    "p-3 rounded text-lg transition cursor-pointer";

  const btnTheme = darkMode
    ? "bg-gray-600 text-white hover:bg-gray-500"
    : "bg-gray-300 text-black hover:bg-gray-400";

  return (
    <div
      className={`
        rounded-xl p-4 mt-4
        ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
      `}
    >
      {/* DISPLAY */}
      <input
        type="text"
        value={display}
        readOnly
        className={`
          w-full mb-4 p-3 text-right text-xl rounded
          ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
        `}
      />

      {/* BUTTONS */}
      <div className="grid grid-cols-4 gap-3">
        <button
          onClick={clear}
          className="col-span-2 bg-red-500 p-3 rounded text-white hover:bg-red-600"
        >
          C
        </button>

        <button onClick={() => handleClick("/")} className={`${btnBase} ${btnTheme} text-align-center`}>
          /
        </button>

        <button onClick={() => handleClick("*")} className={`${btnBase} ${btnTheme}`}>
          ×
        </button>

        {["7", "8", "9", "-"].map((v) => (
          <button
            key={v}
            onClick={() => handleClick(v)}
            className={`${btnBase} ${btnTheme}`}
          >
            {v}
          </button>
        ))}

        {["4", "5", "6", "+"].map((v) => (
          <button
            key={v}
            onClick={() => handleClick(v)}
            className={`${btnBase} ${btnTheme}`}
          >
            {v}
          </button>
        ))}

        {["1", "2", "3"].map((v) => (
          <button
            key={v}
            onClick={() => handleClick(v)}
            className={`${btnBase} ${btnTheme}`}
          >
            {v}
          </button>
        ))}

        <button
          onClick={() => handleClick("0")}
          className={`${btnBase} ${btnTheme} col-span-2`}
        >
          0
        </button>

        <button onClick={() => handleClick(".")} className={`${btnBase} ${btnTheme}`}>
          .
        </button>

        <button
          onClick={calculate}
          className="bg-orange-500 p-3 rounded text-white hover:bg-orange-600"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
