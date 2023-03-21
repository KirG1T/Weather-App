export enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type IncomingData = string;

export interface CityInfo {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
}

export interface CitiesState {
    data: CityInfo[];
    status: Status;
}

export type CityOption = CityInfo & {
    value: { lat: number; lon: number };
    label: string;
};

export interface CurrentWeather {
    temp: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    weatherDescr: string;
    icon: string;
}

export interface WeatherState {
    cityName: string;
    curWeather: CurrentWeather | null;
    status: Status;
}
