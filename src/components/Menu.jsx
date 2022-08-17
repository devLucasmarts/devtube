import React from 'react';
import styled from 'styled-components';
import MartsTube from '../images/logo.png';

const Menu = () => {
  return (
    <Container>
        <Wrapper>
            <Logo>
                <Img src={ MartsTube } />
                MartsTube
            </Logo>
        </Wrapper>
    </Container>
  );
};

const Container = styled.section`
    flex: 1;
    background-color: #202020;
    height: 100vh;
    color: white;
`;

const Wrapper = styled.section`
    padding: 18px 26px;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`;

const Img = styled.img`
    height: 25px;
`;

export default Menu;
