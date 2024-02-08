import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(9);
  const [number, setNumber] = useState(true);
  const [char, setChar] = useState(true);
  const [password, setPassword] = useState("");

  const refPass = useRef(null);
  const copyPass = () => {
    navigator.clipboard.writeText(password); // Copy password to clipboard
  };

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "123456789";
    if (char) str += "!@#$%^&*_~";
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * str.length);
      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [length, number, char]);

  useEffect(() => {
    passwordGen();
  }, [length, char, number, passwordGen]);

  return (
    <>
      <div className="charcoal">
        <div className="px-10 py-10">
          <h1 className="text-4xl  ">Password Generator</h1>
        </div>
        <div className="input flex ">
          <input
            className="w-full px-3 py-5 rounded-md  bg-gray-300 "
            value={password}
            placeholder="Password"
            ref={refPass}
            readOnly
          />
          <button
            className="inline-block px-12 py-3 text-lg font-bold text-white bg-purple-600 border border-purple-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
            href="/download"
            onClick={copyPass}
          >
            Copy
          </button>
        </div>
        <div className="px-3 py-3">
          <input
            type="range"
            value={length}
            className="cursor-pointer"
            min={6}
            max={40}
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="px-5 font-bold text-xl font-color">
            Length {length}
          </label>
          <div className="py-4">
            <input
              type="checkbox"
              className="transform scale-150 mr-2 h-5 w-6"
              defaultChecked={number}
              onChange={() => setNumber((prev) => !prev)}
            />
            <label className="px-5 font-bold text-xl font-color ">
              Include Numbers
            </label>
          </div>
          <div className="py-4">
            <input
              type="checkbox"
              className="transform scale-150 mr-2 h-5 w-6"
              defaultChecked={char}
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label className="px-5 font-bold text-xl font-color ">
              Include Characters
            </label>
          </div>
        </div>
        <div>
          <button
            className="inline-block px-12 py-3 text-lg font-bold text-white bg-purple-600 border border-purple-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
            onClick={passwordGen}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
