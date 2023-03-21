import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchForecast from './asyncActions';
import { ForecastFinalData, ForecastState, Status } from './types';

const initialState: ForecastState = {
    forecastData: null,
    status: Status.IDLE,
};

export const forecastSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            fetchForecast.fulfilled,
            (state, action: PayloadAction<ForecastFinalData[]>) => {
                state.forecastData = action.payload;
                state.status = Status.SUCCESS;
            }
        );
    },
});

export default forecastSlice.reducer;
