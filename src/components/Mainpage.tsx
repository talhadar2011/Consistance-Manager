import { useState } from "react";

export default function Mainpage() {
  const [inputValue, setInputValue] = useState("");
  const [habitList, setHabitList] = useState<string[]>([]);
  const [addHabit, setAddHabit] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const value = inputValue.trim();
    if (!value) return;

    setHabitList((prev) => [...prev, value]);
    setInputValue("");
    setAddHabit(false);
  };

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

      {/* ADD HABIT */}
      <div className="bg-white p-4 rounded shadow mb-6 max-w-md mx-auto">
        <button
          onClick={() => setAddHabit(true)}
          className="bg-emerald-500 text-white px-4 py-2 rounded font-semibold"
        >
          Add Habit
        </button>

        {addHabit && (
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter habit name"
            className="mt-4 w-full border-2 border-gray-300 rounded p-2"
          />
        )}
      </div>

      {/* HABIT TRACKER */}
      <div className="bg-white rounded shadow p-4 overflow-auto">
        <div
          className="grid gap-y-2"
          style={{
            gridTemplateColumns: `220px repeat(${daysInMonth}, 48px)`,
            gridAutoRows: "64px",
          }}
        >
          {/* HEADER */}
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

          {/* ROWS */}
          {habitList.map((habit, i) => (
            <div key={i} className="contents">
              <div className="flex items-center px-4 bg-gray-200 font-semibold rounded">
                {habit}
              </div>

              {Array.from({ length: daysInMonth }, (_, d) => (
                <div key={d} className="flex items-center justify-center">
                  <input type="checkbox" className="w-4 h-4" />
                </div>
              ))}
            </div>
          ))}

          {habitList.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              No habits added yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
