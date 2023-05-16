import React, { useState, useEffect } from 'react';
import './Weather.css';
const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [backgroundClass,setBackgroundClass] = useState('');
  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "2e7d4d1f297315db76c3c0081ef9ccec";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeatherData(data);
      setBackgroundClass(getBackgroundClass(data.weather[0].main));
    };
      fetchWeatherData();
  }, [city]);
  const handleInputChange = (event) => {
    setCity(event.target.value);
  };
  const getBackgroundClass = (weatherMain) => {
    if (weatherMain === 'Clouds') {
      return 'cloudy-bg';
    } else if (weatherMain === 'Clear') {
      return 'sunny-bg';
    } else if (weatherMain === 'Rain') {
      return 'rainy-bg';
    } else {
      return '';
    }
  };
console.log(weatherData)
  return (
    <div className={`container ${backgroundClass}`}>
      <input className="input" type="text" placeholder="Enter a city name" onChange={handleInputChange} />
      {weatherData.main && (
        <div className="elements">
          <div className="head">
          <h1 className="name">{weatherData.name}</h1>
          <p className="history">{new Date ().getMonth()+1}/{new Date().getDate()}/{new Date().getFullYear()}</p>
          </div>
          <p className="temp">Temperature: {weatherData.main.temp.toFixed()}°c</p>
          <div>
          <p className="humid">Humidity: {weatherData.main.humidity}%</p>
          </div>
          <p className="condition">Weather: {weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
};
export default Weather;