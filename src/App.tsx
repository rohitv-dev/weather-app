import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import WeatherCard from "./components/WeatherCard";

interface WeatherError {
  code: number;
  message: string;
}

async function fetcher(loc: string): Promise<ForecastWeather> {
  const key = import.meta.env.VITE_WEATHER_API_KEY;
  const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${loc}&days=4`);
  const json = await res.json();

  if (res.status === 400) {
    if (json?.error?.code) throw new Error(json.error.message);
  }
  return json;
}

function App() {
  const [location, setLocation] = useState("chennai");
  const [locationInput, setLocationInput] = useState("");

  const { isLoading, isError, isFetching, data, error } = useQuery({
    queryKey: ["weather", "forecast", location],
    queryFn: () => fetcher(location),
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 30,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const updateLocation = () => {
    setLocation(locationInput.toLowerCase());
  };

  if (isLoading)
    return (
      <div className="container mx-auto h-screen w-full flex flex-col justify-center items-center">
        <span className="text-bold text-3xl">Loading...</span>
      </div>
    );

  return (
    <div className="container mx-auto h-screen w-full flex flex-col justify-center items-center">
      <span className="text-xl font-bold mb-4">Weather App</span>
      <div className="mt-4 flex justify-center items-center">
        <input
          className="input input-bordered w-full"
          placeholder="Location"
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button className="btn ml-2" onClick={updateLocation}>
          GO
        </button>
      </div>
      {isError ? (
        <div className="mt-4 flex flex-col text-center">
          {/* <span className="text-bold text-3xl">Error</span> */}
          <span>{`${error}`}</span>
        </div>
      ) : (
        <WeatherCard data={data} />
      )}
    </div>
  );
}

export default App;
