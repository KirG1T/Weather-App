import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentWeather, IncomingData, Status, WeatherState } from './types';
import { fetchCurrentWeather } from './asyncActions';

const initialState: WeatherState = {
    cityName: '',
    curWeather: null,
    status: Status.IDLE,
};

export const currentWeatherSlice = createSlice({
    name: 'currentWeather',
    initialState,
    reducers: {
        setCityName: (state, action: PayloadAction<IncomingData>) => {
            state.cityName = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(
            fetchCurrentWeather.fulfilled,
            (state, action: PayloadAction<CurrentWeather>) => {
                state.curWeather = action.payload;
                state.status = Status.SUCCESS;
            }
        );
    },
});

export const { setCityName } = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
