import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  loading: boolean;
  error: string | null;
}

const CHAITEN_LAT = -42.9167;
const CHAITEN_LON = -72.7167;

export function useWeather(): WeatherData {
  const [data, setData] = useState<WeatherData>({
    temp: 0,
    description: '',
    icon: '',
    humidity: 0,
    windSpeed: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${CHAITEN_LAT}&longitude=${CHAITEN_LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=America%2FSantiago`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        const current = json.current;
        const code: number = current.weather_code;

        const { desc, icon } = decodeWMO(code);
        setData({
          temp: Math.round(current.temperature_2m),
          description: desc,
          icon,
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          loading: false,
          error: null,
        });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Sin conexión',
          temp: 12,
          description: 'Parcialmente nublado',
          icon: '⛅',
          humidity: 75,
          windSpeed: 18,
        }));
      }
    }

    fetchWeather();
    return () => controller.abort();
  }, []);

  return data;
}

function decodeWMO(code: number): { desc: string; icon: string } {
  if (code === 0) return { desc: 'Despejado', icon: '☀️' };
  if (code <= 2) return { desc: 'Poco nublado', icon: '🌤️' };
  if (code === 3) return { desc: 'Nublado', icon: '☁️' };
  if (code <= 49) return { desc: 'Niebla', icon: '🌫️' };
  if (code <= 57) return { desc: 'Llovizna', icon: '🌦️' };
  if (code <= 65) return { desc: 'Lluvia', icon: '🌧️' };
  if (code <= 75) return { desc: 'Nieve', icon: '❄️' };
  if (code <= 82) return { desc: 'Chubascos', icon: '🌨️' };
  if (code <= 99) return { desc: 'Tormenta', icon: '⛈️' };
  return { desc: 'Variable', icon: '🌡️' };
}
