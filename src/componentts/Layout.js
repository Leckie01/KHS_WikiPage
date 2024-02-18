import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding: 40px;

  @media (min-width: 768px) {
    width: 750px;
  }

  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: 1170px;
  }
`;

const Logo = styled.img`
  height: 3rem;
`;

const Layout = () => {
  return (
    <Container>
      <Logo src='https://nginx.codinghub.co.kr/assets/codinghub_typeLogoBlack.svg' />
      <Outlet />
    </Container>
  );
};

export default Layout;
