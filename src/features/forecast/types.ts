export enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type IncomingData = string;

interface ForecastWeatherData {
    description: string;
    icon: string;
}

interface ForecastMainData {
    [key: string]: number;
}

export interface ForecastData {
    dt_txt: string;
    main: ForecastMainData;
    weather: ForecastWeatherData[];
}

export interface ForecastFinalData {
    dayName: string;
    dt_txt: string;
    icon: string;
    temp: number;
    weatherDescr: string;
}

export interface ForecastState {
    forecastData: ForecastFinalData[] | null;
    status: Status;
}
