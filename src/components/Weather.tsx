import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/store';
import getCurrentDate from '../utils/getCurrentDate';
import ForecastCard from './ForecastCard';
import Search from './Search';
import SomeInfo from './SomeInfo';

type CityNameProp = {
    cityName?: string;
    temp?: number;
    descr?: string;
    icon?: string;
};

const Wrapper = styled.div`
    width: 430px;
    max-width: 100%;
    padding: 40px 0 50px 40px;
    border-radius: 30px;
    background-image: url('/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    color: black;
    min-height: 567px;

    @media (max-width: 880px) {
        padding: 20px 15px 0 15px;
    }

    @media (max-width: 420px) {
        padding: 30px 15px 0 15px;
        width: 100vw;
        height: 100vh;
        border-radius: 0;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;

    @media (max-width: 880px) {
        align-items: center;
    }
`;

const DayAndLocation = styled.div<CityNameProp>`
    margin-bottom: 250px;

    p:nth-of-type(1) {
        font-size: 38px;
    }

    p:nth-of-type(2) {
        font-size: 22px;
        font-weight: 400;
        padding: 3px 0 15px 0;
    }

    p:nth-of-type(3) {
        font-size: 20px;
        font-weight: 600;
        padding-left: 30px;
        position: relative;
        min-height: 24px;

        ::before {
            content: '';
            position: absolute;
            left: 0;
            background-image: url('/Icon.svg');
            background-size: cover;
            background-repeat: no-repeat;
            width: 22px;
            height: 22px;
        }

        opacity: ${({ cityName }) => (cityName ? 1 : 0)};
    }
`;

const WeatherInfo = styled.div<CityNameProp>`
    p:nth-of-type(1) {
        position: relative;
        font-size: 50px;
        padding: 0 0 13px 0;
        min-height: 74px;

        ::before {
            content: '';
            position: absolute;
            left: 0;
            top: -2em;
            background-image: url(${({ icon }) =>
                `/icons/${icon}.png` || '/icons/unknown.png'});
            background-size: cover;
            background-repeat: no-repeat;
            width: 1.8em;
            height: 1.8em;
        }

        opacity: ${({ temp }) => (temp ? 1 : 0)};

        @media (max-width: 880px) {
            position: relative;
            font-size: 40px;
            padding: 60px 0 10px 0;
            min-height: 0;

            ::before {
                left: 10px;
                top: -0.3em;
            }
        }

        @media (max-width: 420px) {
            font-size: 80px;
            padding: 120px 0 10px 0;
        }

        @media (max-width: 380px) {
            font-size: 50px;
            padding: 80px 0 10px 0;
        }
    }

    p:nth-of-type(2) {
        font-size: 30px;
        min-height: 37px;
        opacity: ${({ descr }) => (descr ? 1 : 0)};

        @media (max-width: 880px) {
            font-size: 20px;
            padding: 0;
            min-height: 0;
        }

        @media (max-width: 420px) {
            font-size: 25px;
        }

        @media (max-width: 380px) {
            font-size: 20px;
        }
    }

    @media (max-width: 880px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        order: 2;

        span {
            display: block;
            margin: 20px 0;
            font-size: 25px;
        }
    }

    @media (max-width: 420px) {
        span {
            margin: 50px 0 20px 0;
        }
    }

    @media (max-width: 380px) {
        span {
            font-size: 20px;
            margin: 20px;
        }
    }
`;

const Weather: FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    const { getCurDayNum, getCurDayName, getCurMonthName, getCurYearName } =
        getCurrentDate();

    const { cityName, curWeather } = useSelector(
        (state: RootState) => state.currentWeather
    );

    let iconName;
    if (curWeather?.icon) {
        iconName = curWeather?.icon;
    } else {
        iconName = '';
    }

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 880);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Wrapper>
            <FlexContainer>
                {isMobile && <Search />}
                {!isMobile && (
                    <DayAndLocation cityName={cityName}>
                        <p>{getCurDayName()}</p>
                        <p>
                            {getCurDayNum()} {getCurMonthName()}{' '}
                            {getCurYearName()}
                        </p>
                        <p>{cityName}</p>
                    </DayAndLocation>
                )}
                {isMobile && <SomeInfo />}
                {isMobile && <ForecastCard />}
                {curWeather && (
                    <WeatherInfo
                        temp={curWeather?.temp}
                        descr={curWeather?.weatherDescr}
                        icon={iconName}
                    >
                        {isMobile && <span>{cityName}</span>}
                        <p>{curWeather?.temp} °C</p>
                        <p>{curWeather?.weatherDescr}</p>
                    </WeatherInfo>
                )}
            </FlexContainer>
        </Wrapper>
    );
};

export default Weather;
