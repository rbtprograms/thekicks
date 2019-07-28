import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
import Router from 'next/router';
import { start as nProgressStart, done as nProgressDone } from 'nprogress';

(Router as any).onRouteChangeStart = () => {
  nProgressStart();
};
(Router as any).onRouteChangeComplete = () => {
  nProgressDone();
};
(Router as any).onRouteChangeError = () => {
  nProgressDone();
};

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background-color: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1000px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a href="">theKicks</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="subBar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </StyledHeader>
);

export default Header;
