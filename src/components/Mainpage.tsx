import { useState } from "react";
import Dayspage from "./Dayspage";

export default function Mainpage() {
  const [inputValue, setInputValue] = useState("");
  const [habitList, setHabitList] = useState<string[]>([]);
  const [addHabit, setaddHabit] = useState(false);
  const handleKeyDown = (e: any) => {
    if (e.key !== "Enter") return;

    const trimmedValue = inputValue.trim();

    if (trimmedValue !== "") {
      setHabitList((prev) => [...prev, trimmedValue]);
      setInputValue("");
    }

    setaddHabit(false);
  };
  return (
    <div className="w-full h-screen bg-gray-100 p-10 ">
      <div>
        <h1 className="text-4xl font-bold text-center mt-20">
          Welcome to Consistance Manager
        </h1>

        <div className="flex bg-white shadow-2xl rounded-lg w-full mt-10 p-10 h-90 overflow-auto">
          <div className="w-[30%]">
            {/* HEADER */}
            <div className="bg-gray-200 rounded p-2">
              <h2 className="text-2xl font-semibold text-black">Your Habits</h2>
              <button
                onClick={() => setaddHabit(true)}
                className="bg-emerald-400 rounded p-2 font-bold text-white"
              >
                Add Habit
              </button>

              {addHabit && (
                <input
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="bg-white border-2 border-gray-500 rounded p-2 mt-5 w-full"
                  placeholder="Enter Habit Name"
                />
              )}
            </div>

            <div  />

            {habitList.map((habit, index) => (
              <div
                key={index}
                className="h-14 mt-2 px-3 bg-gray-200 rounded font-bold flex items-center"
              >
                {habit}
              </div>
            ))}
          </div>
          <div className="w-[70%] h-14 ">
            <h2 className="text-2xl font-semibold text-">Days</h2>
            <Dayspage habits={habitList} />
          </div>
        </div>
      </div>
    </div>
  );
}
