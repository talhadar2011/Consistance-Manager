import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type GraphItem = {
  habit: string;
  day: number;
};

type Props = {
  habit: string;
  graphData: GraphItem[];
  daysInMonth: number;
};

export default function HabitProgressChart({
  habit,
  graphData,
  daysInMonth,
}: Props) {
  const completedDays = graphData.filter(
    (item) => item.habit === habit
  ).length;

  const remainingDays = daysInMonth - completedDays;

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completedDays, remainingDays],
        backgroundColor: ["#22c55e", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-40 h-40">
        <Doughnut data={data} options={options} />
      </div>
      <p className="text-sm font-semibold">{habit}</p>
      <p className="text-xs text-gray-500">
        {completedDays}/{daysInMonth} days
      </p>
    </div>
  );
}
