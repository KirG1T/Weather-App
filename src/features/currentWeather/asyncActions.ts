import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, GEO_API_URL, WEATHER_API_URL } from '../../api';

import { CityInfo, CityOption, IncomingData, CurrentWeather } from './types';

const fetchCities = createAsyncThunk<CityOption[], IncomingData>(
    'cities/fetchCitiesGeo',
    async (name) => {
        try {
            const { data } = await axios.get(
                `${GEO_API_URL}direct?q=${name}&limit=5&appid=${API_KEY}`
            );

            return data.map((city: CityInfo) => {
                return {
                    value: { lat: city.lat, lon: city.lon },
                    label: `${city.name}, ${city.country}${
                        city.state ? ',' : ''
                    } ${city.state ? city.state : ''}`,
                };
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

const fetchCurrentWeather = createAsyncThunk<CurrentWeather, IncomingData>(
    'selectedCity/fetchCurrentWeather',
    async (location) => {
        try {
            const { data } = await axios.get(
                `${WEATHER_API_URL}weather?${location}&appid=${API_KEY}&units=metric&lang=en`
            );
            return {
                temp: Math.round(data.main.temp),
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                windSpeed: Math.round(data.wind.speed),
                weatherDescr:
                    data.weather[0].description.split('')[0].toUpperCase() +
                    data.weather[0].description.slice(1),
                icon: data.weather[0].icon,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export { fetchCities, fetchCurrentWeather };
