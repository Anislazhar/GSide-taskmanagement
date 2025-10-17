import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CounterCardProps {
  title?: string;
  value: number;
  target: number;
  unit?: string;
  color?: string;
}

const CounterCard: React.FC<CounterCardProps> = ({
  title = "Tasks Completed",
  value,
  target,
  unit = "tasks",
  color = "#4f46e5",
}) => {
  const percentage = Math.min((value / target) * 100, 100);
  const remaining = Math.max(target - value, 0);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
      <h4 className="text-gray-700 font-semibold text-sm mb-4 text-center">
        {title}
      </h4>

      <div className="w-28 h-28 sm:w-32 sm:h-32 mb-3">
        <CircularProgressbar
          value={percentage}
          text={`${value}`}
          strokeWidth={10}
          styles={buildStyles({
            textSize: "20px",
            pathColor: color,
            textColor: "#111827",
            trailColor: "#E5E7EB",
            backgroundColor: "#ffffff",
          })}
        />
      </div>

      <div className="text-center space-y-1">
        <p className="text-xs text-gray-500"></p>
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-rose-500">{remaining}</span>{" "}
          {unit} to reach the daily goal
        </p>
      </div>
    </div>
  );
};

export default CounterCard;
