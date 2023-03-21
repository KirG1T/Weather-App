import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import currentWeatherReducer from '../features/currentWeather/currentWeatherSlice';
import forecastReducer from '../features/forecast/forecastSlice';

export const store = configureStore({
    reducer: {
        currentWeather: currentWeatherReducer,
        forecast: forecastReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
