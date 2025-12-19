import { useState } from "react";

import HabitProgressChart from "./chart";

export default function Mainpage() {
  const [inputValue, setInputValue] = useState("");
  const [habitList, setHabitList] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<{ habit: string; day: number }[]>([]);
  function handleKeyDown () {
    const value = inputValue.trim();
    console.log("Adding habit:", value);
    if (!value) return;

    setHabitList((prev) => [...prev, value]);
    setInputValue("");
  };
  function handleGraphData(e: React.ChangeEvent<HTMLInputElement>, habit: string, day: number) {
      
    if (e.target.checked) {
      setGraphData((prev) => [...prev, { habit, day }]);
    } else {
      setGraphData((prev) =>
        prev.filter(
          (item) => !(item.habit === habit && item.day === day)
        )
      );
    }
  }
  console.log("Current graph data:", graphData);
 
  const now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  return (
    <div className="w-full min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Welcome to Consistence Manager
      </h1>

      <div className="flex  gap-2 bg-white p-4 rounded shadow mb-6 max-w-lg mx-auto">
        <button
          onClick={handleKeyDown}
          className="bg-emerald-500 text-white  p-2 rounded font-semibold pointer-cursor w-32"
        >
          Add Habit
        </button>

        
           <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter habit name"
            className=" w-full border-2 border-gray-300 rounded p-2"
          /> 
        
      </div>

      <div className="bg-white rounded shadow p-4 overflow-auto">
        <div
          className="grid gap-y-2"
          style={{
            gridTemplateColumns: `220px repeat(${daysInMonth}, 48px)`,
            gridAutoRows: "64px",
          }}
        >
          <div className="flex items-center px-4 font-bold bg-gray-100 rounded">
            Habits
          </div>

          {Array.from({ length: daysInMonth }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-center font-semibold bg-gray-100"
            >
              {i + 1}
            </div>
          ))}

          {habitList.map((habit, i) => (
            <div key={i} className="contents">
              <div className="flex items-center px-4 bg-gray-200 font-semibold rounded">
                {habit}
              </div>

               {Array.from({ length: daysInMonth }, (_, d) => {
                const isChecked = graphData.some(
                  (item) => item.habit === habit && item.day === d
                );

                return (
                  <div key={d} className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={isChecked}
                      onChange={(e) => handleGraphData(e, habit, d)}
                    />
                  </div>
                );
              })}
            </div>
          ))}

          {habitList.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              No habits added yet
            </div>
          )}
        </div>
      </div>
      <div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {habitList.map((habit) => (
          <HabitProgressChart
            key={habit}
            habit={habit}
            graphData={graphData}
            daysInMonth={daysInMonth}
          />
        ))}
      </div>

      </div>
    </div>
  );
}
