import { useEffect, useState } from "react";
import axios from "axios";

export type WeatherData = {
  city: string;
  tempC: number;
  description: string;
  icon?: string;
};

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = "12927cf87be18d8a75c071358a74b984";
  const cacheKey = "weather_cache_v1";

  useEffect(() => {
    if (!apiKey) {
      setError("Weather API key missing (REACT_APP_OPENWEATHER_KEY).");
      setLoading(false);
      return;
    }
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as {
          ts: number;
          payload: WeatherData;
        };
        if (Date.now() - parsed.ts < 10 * 60 * 1000) {
          setData(parsed.payload);
          setLoading(false);
          return;
        }
      }
    } catch {}

    if (!("geolocation" in navigator)) {
      setError("Geolocation not available in this browser.");
      setLoading(false);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
          const res = await axios.get(url, { timeout: 8000 });

          const payload: WeatherData = {
            city: res.data?.name ?? "Unknown",
            tempC: Math.round(res.data?.main?.temp ?? 0),
            description: res.data?.weather?.[0]?.description ?? "N/A",
            icon: res.data?.weather?.[0]?.icon,
          };

          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ ts: Date.now(), payload })
          );
          setData(payload);
          setError(null);
        } catch (err) {
          console.error("Weather fetch failed", err);
          setError("Failed to fetch weather");
        } finally {
          setLoading(false);
        }
      },
      (geoErr) => {
        console.warn("Geolocation error", geoErr);
        setError("Location permission denied");
        setLoading(false);
      },
      { enableHighAccuracy: false, maximumAge: 1000 * 60, timeout: 10_000 }
    );
  }, [apiKey]);

  return { data, loading, error };
}
