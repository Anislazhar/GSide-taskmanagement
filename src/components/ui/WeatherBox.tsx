import React, { useEffect, useState } from "react";
import { WeatherData } from "../../features/weather/weather";

const WeatherBox: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error("Failed to fetch weather data");
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    console.log(process.env.REACT_APP_WEATHER_API_KEY);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-xs font-bold mb-2">{weather?.name}</h2>
      <div className="flex flex-col justify-center items-center space-x-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
          alt={weather?.weather[0].description}
        />
        <div>
          <p className="text-3xl font-semibold">{weather?.main.temp}°C</p>
          <p className="capitalize">{weather?.weather[0].description}</p>
          <p>Humidity: {weather?.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherBox;
