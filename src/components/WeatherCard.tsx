interface WeatherCardProps {
  data: ForecastWeather;
}

function WeatherCard({ data }: WeatherCardProps) {
  return (
    <div className="card card-bordered shadow-lg min-w-[400px] mt-4 border-white max-w-[600px]">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <img src={data.current.condition.icon} width={50} height={50} />
              <span className="text-3xl">{data.current.temp_c}C</span>
            </div>
            <span className="pl-2">{data.current.condition.text}</span>
          </div>
          <div className="w-20"></div>
          <div className="flex flex-col text-end">
            <span className="font-bold">
              {data.location.name}, {data.location.region}, {data.location.country}
            </span>
            <span className="text-sm">
              {data.location.localtime}, {data.location.tz_id}
            </span>
          </div>
        </div>
        <div className="flex text-center overflow-hidden">
          {data.forecast.forecastday.map((forecast) => {
            return (
              <div key={forecast.date_epoch} className="card card-bordered mx-2 hover:border-white">
                <div className="card-body p-2">
                  <span>{forecast.date}</span>
                  <img src={forecast.day.condition.icon} height={30} width={30} />
                  <div>
                    <span className="font-bold">{forecast.day.maxtemp_c} </span>
                    <span className="font-semibold">{forecast.day.mintemp_c}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <span className="mt-4 text-end text-sm">Last updated: {data.current.last_updated}</span>
      </div>
    </div>
  );
}

export default WeatherCard;
