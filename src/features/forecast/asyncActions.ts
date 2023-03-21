import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, WEATHER_API_URL } from '../../api';
import getCurrentDate from '../../utils/getCurrentDate';
import { ForecastData, ForecastFinalData, IncomingData } from './types';

const fetchForecast = createAsyncThunk<ForecastFinalData[], IncomingData>(
    'selectedWeather/fetchForecast',
    async (location) => {
        try {
            const { data } = await axios.get(
                `${WEATHER_API_URL}forecast?${location}&appid=${API_KEY}&units=metric&lang=en`
            );

            const forecastResult: ForecastFinalData[] = data.list
                .filter((item: ForecastData) =>
                    item.dt_txt.includes('12:00:00')
                )
                .map((item: ForecastData) => {
                    return {
                        dayName: getCurrentDate().getDayName(item.dt_txt, 3),
                        dt_txt: item.dt_txt,
                        temp: Math.round(item.main.temp),
                        weatherDescr:
                            item.weather[0].description
                                .split('')[0]
                                .toUpperCase() +
                            item.weather[0].description.slice(1),
                        icon: item.weather[0].icon,
                    };
                });
            if (
                forecastResult[0].dayName ===
                getCurrentDate().getCurDayName().slice(0, 3)
            ) {
                return forecastResult.slice(1);
            }
            return forecastResult.slice(0, 4);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export default fetchForecast;
