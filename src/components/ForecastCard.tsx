import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../store/store';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media (max-width: 880px) {
        order: 4;
        justify-content: space-around;
    }
`;

const Сard = styled.div`
    font-size: 20px;
    width: 92px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0 20px 0;
    background-color: #fff;
    color: black;
    border-radius: 10px;

    img {
        width: 2.5em;
    }

    p:nth-of-type(1) {
        margin: 15px 0;
    }

    @media (max-width: 880px) {
        font-size: 18px;
        width: 80px;
        padding: 10px 0 10px 0;
    }

    @media (max-width: 380px) {
        font-size: 16px;
        width: 70px;
    }

    @media (max-width: 280px) {
        font-size: 16px;
        width: 55px;
    }
`;

const ForecastCard: FC = () => {
    const forecast = useSelector(
        (state: RootState) => state.forecast.forecastData
    );

    return (
        <Wrapper>
            {forecast &&
                forecast.map((day) => (
                    <Сard key={day.dt_txt}>
                        <img
                            src={
                                `/icons/${day.icon}.png` || `/icons/unknown.png`
                            }
                            alt={day.weatherDescr || 'unknown'}
                            title={day.weatherDescr || 'unknown'}
                        />

                        <p>{day.dayName}</p>
                        <p>{day.temp} °C</p>
                    </Сard>
                ))}
        </Wrapper>
    );
};

export default ForecastCard;
