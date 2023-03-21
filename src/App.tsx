import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Weather from './components/Weather';
import WeatherInfo from './components/WeatherInfo';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #343d4b;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
`;

const App: FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 880);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Wrapper>
            <Weather />
            {!isMobile && <WeatherInfo />}
        </Wrapper>
    );
};

export default App;
