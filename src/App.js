import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import { darkTheme, lightTheme } from './utils/theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Video from './pages/Video';
import Login from './pages/Login';
import usePersistedState from './utils/usePersistedState';
import Search from './pages/Search';
import Settings from './pages/Settings';
import Channel from './pages/Channel';
import UpdateVideo from './pages/UpdateVideo';

const App = () => {

  const [theme, setTheme] = usePersistedState('theme', lightTheme);

  const { currentUser } = useSelector(state => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const user = currentUser?.username?.replace(/\s/g, '');

  const toggleTheme = () => {

    setTheme(theme.title === 'light' ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={ theme }>
      <Container>
        <BrowserRouter>
          <Menu toggleTheme={ toggleTheme } />
          <Main>
            <Navbar toggleTheme={ toggleTheme } />
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={ <Home type="random" /> } />
                  <Route path="trends" element={ <Home type="trend" /> } />
                  <Route path="subscriptions" element={ <Home type="sub" /> } />
                  <Route path="search" element={ <Search /> } />
                  <Route path="signin" element={ <Login /> } />
                  <Route path="video">
                    <Route path=":id" element={ <Video /> } />
                  </Route>
                  <Route path="settings" element={ <Settings /> } />
                  <Route path={ `channel/${user}` } element={ <Channel /> } />
                  <Route path={`edit-video/${currentVideo?._id}`} element={ <UpdateVideo /> } />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.section`
  display: flex;
`;

const Main = styled.section`
  flex: 7;
  background-color: ${({theme}) => theme.bg};
`;

const Wrapper = styled.section`
  padding: 22px, 96px;
`;

export default App;
