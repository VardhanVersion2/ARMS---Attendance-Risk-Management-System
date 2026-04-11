import { useState } from "react";
import axios from "axios";

export default function App() {
  const [input, setInput] = useState({
    present: "",
    total: "",
    target: 75
  });

  const [result, setResult] = useState(null);

  const [predict, setPredict] = useState({
    attend: 0,
    bunk: 0
  });

  const [future, setFuture] = useState(null);

  const calculate = async () => {
    const res = await axios.post("http://localhost:5000/calculate", input);
    setResult(res.data);
  };

  const predictFuture = async () => {
    const res = await axios.post("http://localhost:5000/predict", {
      present: Number(input.present),
      total: Number(input.total),
      attend: Number(predict.attend),
      bunk: Number(predict.bunk)
    });
    setFuture(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">ARMS MVP</h1>

      {/* Calculator */}
      <div className="bg-gray-800 p-6 rounded-xl w-80 mb-6">
        <input
          placeholder="Present"
          className="w-full mb-2 p-2 text-black"
          onChange={(e) => setInput({ ...input, present: e.target.value })}
        />
        <input
          placeholder="Total"
          className="w-full mb-2 p-2 text-black"
          onChange={(e) => setInput({ ...input, total: e.target.value })}
        />

        <button
          onClick={calculate}
          className="bg-blue-500 w-full p-2 rounded"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-4">
            <p>📊 {result.percentage.toFixed(2)}%</p>
            <p>📈 Need: {result.required}</p>
            <p>😴 Bunks: {result.bunks}</p>
            <p>⚠️ Risk: {result.risk}</p>
          </div>
        )}
      </div>

      {/* Prediction */}
      <div className="bg-gray-800 p-6 rounded-xl w-80">
        <h2 className="mb-2">Future Simulator</h2>

        <input
          placeholder="Attend"
          className="w-full mb-2 p-2 text-black"
          onChange={(e) => setPredict({ ...predict, attend: e.target.value })}
        />
        <input
          placeholder="Bunk"
          className="w-full mb-2 p-2 text-black"
          onChange={(e) => setPredict({ ...predict, bunk: e.target.value })}
        />

        <button
          onClick={predictFuture}
          className="bg-green-500 w-full p-2 rounded"
        >
          Predict
        </button>

        {future && (
          <div className="mt-4">
            <p>🔮 {future.future.toFixed(2)}%</p>
            <p>⚠️ {future.risk}</p>
          </div>
        )}
      </div>
    </div>
  );
}