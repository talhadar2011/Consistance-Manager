import React from "react";

export default function Dayspage({ habits }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="overflow-x-auto">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${daysInMonth}, 48px)`,
        }}
      >
        {/* HEADER */}
        {Array.from({ length: daysInMonth }, (_, i) => (
          <div
            key={i}
            className="mb-12 flex items-center justify-center font-semibold"
          >
            {i + 1}
          </div>
        ))}

        {/* CHECKBOX ROWS */}
        {habits.map((_, habitIndex) =>
          Array.from({ length: daysInMonth }, (_, dayIndex) => (
            <div
              key={`${habitIndex}-${dayIndex}`}
              className="mb-12.5 flex items-center justify-center"
            >
              <input type="checkbox" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
