import { FC, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

import { SingleValue } from 'react-select';
import { useAppDispatch } from '../store/store';
import {
    fetchCities,
    fetchCurrentWeather,
} from '../features/currentWeather/asyncActions';
import { CityInfo } from '../features/currentWeather/types';
import { setCityName } from '../features/currentWeather/currentWeatherSlice';
import fetchForecast from '../features/forecast/asyncActions';

const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    img {
        cursor: pointer;
    }

    @media (max-width: 880px) {
        display: block;
        order: 1;
    }
`;

interface SelectOption extends CityInfo {
    value: { lat: number; lon: number };
    label: string;
}

interface LocalData {
    result: string;
    location: string;
}

const Search: FC = () => {
    const dispatch = useAppDispatch();

    const timeoutIdRef = useRef<number | undefined>();

    const loadOptions = useCallback(
        async (searchValue: string): Promise<CityInfo[]> => {
            return new Promise((resolve) => {
                if (timeoutIdRef.current) {
                    clearTimeout(timeoutIdRef.current);
                }
                timeoutIdRef.current = setTimeout(async () => {
                    try {
                        const response = await dispatch(
                            fetchCities(searchValue)
                        );
                        const options = response.payload as CityInfo[];
                        resolve(options);
                    } catch (error) {
                        console.error(error);
                        resolve([]);
                    }
                }, 1000);
            });
        },
        [dispatch, timeoutIdRef]
    );

    const handleChange = (selectedOption: SingleValue<CityInfo>) => {
        const {
            value: { lat, lon },
            label,
        } = selectedOption as SelectOption;
        const location = `lat=${lat}&lon=${lon}`;
        const parts = label.split(', ');
        const result = [parts[0], parts[1]].join(', ');
        dispatch(setCityName(result));
        dispatch(fetchCurrentWeather(location));
        dispatch(fetchForecast(location));
        const localStorageData = {
            result,
            location,
        };
        localStorage.setItem('selectedCity', JSON.stringify(localStorageData));
    };

    useEffect(() => {
        if (localStorage.getItem('selectedCity') !== null) {
            const localData: LocalData = JSON.parse(
                localStorage.getItem('selectedCity') || '{}'
            );
            dispatch(setCityName(localData.result));
            dispatch(fetchCurrentWeather(localData.location));
            dispatch(fetchForecast(localData.location));
        }
    }, [dispatch]);

    return (
        <FlexContainer>
            <AsyncSelect
                name="search"
                loadOptions={loadOptions}
                onChange={handleChange}
                styles={{
                    indicatorsContainer: (provided) => ({
                        ...provided,
                        cursor: 'pointer',
                    }),
                    clearIndicator: (provided) => ({
                        ...provided,
                        padding: '0 8px',
                    }),
                    control: (provided) => ({
                        ...provided,
                        background: 'inherit',
                        borderRadius: '10px',
                        border: '1px solid #fff',
                        fontFamily: 'inherit',
                        width: 380,
                        '@media only screen and (max-width: 880px)': {
                            border: '1px solid rgba(0,0,0,.0)',
                            background: 'rgba(0,0,0,.4)',
                            width: '100%',
                        },
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        color: 'grey',
                        fontWeight: 400,
                        fontSize: 18,
                        '@media only screen and (max-width: 880px)': {
                            color: '#d9d7d7',
                        },
                        '@media only screen and (max-width: 420px)': {
                            fontSize: 16,
                        },
                        '@media only screen and (max-width: 380px)': {
                            fontSize: 14,
                        },
                    }),
                    input: (provided) => ({
                        ...provided,
                        color: '#fff',
                        fontWeight: 500,
                        cursor: 'text',
                        '@media only screen and (max-width: 880px)': {
                            color: 'white',
                        },
                        '@media only screen and (max-width: 420px)': {
                            fontSize: 16,
                        },
                        '@media only screen and (max-width: 380px)': {
                            fontSize: 14,
                        },
                    }),
                    menu: (provided) => ({
                        ...provided,
                        color: '#000',
                        fontWeight: 500,
                        fontSize: 18,
                        background: '#fff',
                        cursor: 'pointer',
                        width: '100%',
                        '@media only screen and (max-width: 420px)': {
                            fontSize: 16,
                        },
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: '#fff',
                        fontWeight: 500,
                        '@media only screen and (max-width: 420px)': {
                            fontSize: 16,
                        },
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        cursor: 'pointer',
                        background: state.isFocused ? '#dbd8e3' : 'transparent',
                        color: '#000',
                        padding: '10px',
                        fontSize: '16px',
                        '&:hover': {
                            background: '#dbd8e3',
                        },
                        fontWeight: 500,
                        '@media only screen and (max-width: 420px)': {
                            fontSize: 16,
                        },
                    }),
                }}
                placeholder="Enter city name ..."
                noOptionsMessage={() => 'No cities'}
            />
        </FlexContainer>
    );
};

export default Search;
