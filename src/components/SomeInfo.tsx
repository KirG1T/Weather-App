import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/store';

const Wrapper = styled.div`
    @media (max-width: 880px) {
        order: 3;
    }
`;

const InfoTable = styled.table`
    font-size: 25px;

    width: 100%;
    margin: 1.8em 0;

    tr {
        display: flex;
        justify-content: space-between;

        td:nth-of-type(2) {
            font-weight: 400;
        }
    }

    tr:not(:first-child):not(:last-child) {
        padding: 0.9em 0;
    }

    @media (max-width: 880px) {
        order: 2;
        font-size: 20px;
        width: 300px;
        margin: 15px 0;

        tr {
            td:nth-of-type(2) {
                font-weight: 500;
            }
        }
    }

    @media (max-width: 420px) {
        font-size: 23px;
        width: 320px;
        margin: 2.5em 0;
    }

    @media (max-width: 380px) {
        font-size: 20px;
        width: 320px;
        margin: 2em 0;
    }

    @media (max-width: 280px) {
        font-size: 18px;
        width: 240px;
        margin: 2em 0;
    }
`;

const WaitBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #cecece;
    font-weight: 400;
    font-size: 18px;
    text-align: center;

    p {
        margin: 46px 0;
    }

    @media (max-width: 880px) {
        color: black;

        p {
            margin: 40px auto;
        }

        img {
            display: block;
            margin-top: 40px;
        }
    }
`;

const SomeInfo: FC = () => {
    const curWeatherData = useSelector(
        (state: RootState) => state.currentWeather.curWeather
    );

    return (
        <Wrapper>
            {curWeatherData ? (
                <InfoTable>
                    <tbody>
                        <tr>
                            <td>PRESSURE</td>
                            <td>{curWeatherData.pressure} hPa</td>
                        </tr>
                        <tr>
                            <td>HUMIDITY</td>
                            <td>{curWeatherData.humidity}%</td>
                        </tr>
                        <tr>
                            <td>WIND</td>
                            <td>{curWeatherData.windSpeed} m/sec</td>
                        </tr>
                    </tbody>
                </InfoTable>
            ) : (
                <WaitBlock>
                    <p>
                        <em>
                            To proceed, kindly input your location into the
                            search panel
                        </em>
                    </p>
                    <img src="/zhdun.png" alt="zhdun" />
                </WaitBlock>
            )}
        </Wrapper>
    );
};

export default SomeInfo;
