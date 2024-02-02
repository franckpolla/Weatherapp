import React from "react";
import "./waetherapp.css";
import Search_icon from "../../images/search.png";
import Clear_icon from "../../images/clear.png";
import Cloud_icon from "../../images/cloud.png";
import Drizzle_icon from "../../images/drizzle.png";
import Humidity_icon from "../../images/humidity.png";
import Rain_icon from "../../images/rain.png";
import Snow_icon from "../../images/snow.png";
import Wind_icon from "../../images/wind.png";
import { useState } from "react";

const WeatherApp = () => {
  const API_KEY = "1e3d50466e73deab968145e21edec05e";
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");

  const Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  const [data, setData] = useState({
    name: "Nicosia",
    speed: 2.57,
    humidity: 55,
    temp: 19,
  });

  const handleClick = () => {
    if (cityName !== "") {
      const fecth = async () => {
        try {
          const responce = await fetch(Url);
          const data = await responce.json();
          console.log(data);
          if (responce.status === 404) {
            setError(`Unable to find the city ${cityName}`);
          } else {
            setError("");
          }
          setData({
            ...data,
            name: data.name,
            speed: data.wind.speed,
            humidity: data.main.humidity,
            temp: data.main.temp,
          });
        } catch (error) {
          console.error(error.message);
        }
      };
      fecth();
    }
  };

  const Image = () => {
    if (data.temp > 0 && data.temp < 10) {
      return Snow_icon;
    }
    if (data.temp < 0) {
      return Snow_icon;
    } else if (data.temp > 10 && data.temp < 16) {
      return Rain_icon;
    } else if (data.temp > 16 && data.temp < 25) {
      return Drizzle_icon;
    } else if (data.temp > 25 && data.temp < 29) {
      return Cloud_icon;
    } else if (data.temp > 29 && data.temp < 55) {
      return Clear_icon;
    }
  };

  return (
    <div id="top_container">
      <div className="container">
        <div className="top-bar">
          <input
            type="text"
            onChange={(event) => setCityName(event.target.value)}
            className="cityInput"
            placeholder="Search"
          />
          <div className="search-icon">
            <button onClick={handleClick}>
              <img src={Search_icon} alt="search-icon" />
            </button>
          </div>
        </div>
        <div>
          <p style={{ color: "red" }}>{error}</p>
        </div>
        <div className="weather-image">
          <img id="WImg" src={Image()} alt="imgae" />
        </div>
        <div className="weather-temp">{data.temp} °c</div>
        <div className="weather-location">{data.name}</div>
        <div className="data-container">
          <div className="element">
            <img src={Humidity_icon} alt="humidity" className="icon" />
            <div className="data">
              <div className="humidity-percent">{data.humidity}</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={Wind_icon} alt="wind" className="icon" />
            <div className="data">
              <div className="wind-rate">{data.speed}</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
