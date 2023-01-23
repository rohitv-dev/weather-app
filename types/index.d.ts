type WeatherType = "current" | "forecast" | "history";
type ObjectType<T> = T extends "forecast" ? ForecastWeather : T extends "current" ? CurrentWeather : HistoryWeather;
