import React from "react";
import CounterCard from "../ui/CounterCard";
import WeatherBox from "../ui/WeatherBox";

const DashboardCounters: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <CounterCard title="" value={143} target={200} unit="more" color="blue" />
    <WeatherBox />
  </div>
);

export default DashboardCounters;
