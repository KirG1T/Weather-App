import { FC } from 'react';
import styled from 'styled-components';
import Search from './Search';
import SomeInfo from './SomeInfo';
import ForecastCard from './ForecastCard';

const Wrapper = styled.div`
    width: 430px;
    max-width: 100%;
    background-color: #222831;
    display: flex;
    justify-content: center;
    padding: 50px 0;
    border-radius: 25px;
`;

const Container = styled.div`
    width: 380px;
    max-width: 100%;
`;

const WeatherInfo: FC = () => {
    return (
        <Wrapper>
            <Container>
                <Search />
                <SomeInfo />
                <ForecastCard />
            </Container>
        </Wrapper>
    );
};

export default WeatherInfo;
