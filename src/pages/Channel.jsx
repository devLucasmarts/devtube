import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const Channel = () => {

  const { currentUser } = useSelector(state => state.user);

  return (
    <Container>
      <ChannelHeader>
        <Avatar src={ currentUser.img } />
        <ChannelInfo>
          <ChannelName>{ currentUser.username }</ChannelName>
          <ChanelSubs>{ currentUser.subscribers } subscribers</ChanelSubs>
        </ChannelInfo>
      </ChannelHeader>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100vh;
`;

const ChannelHeader = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.channelHeaderBg};
  padding: 50px 150px 10px;
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Avatar = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #999;
    margin-right: 30px;
`;

const ChannelName = styled.h1`
    font-size: 1.5em;
    color: ${({theme}) => theme.textSoft};
`;

const ChanelSubs = styled.p`
    font-size: 0.9em;
    color: ${({theme}) => theme.textSoft};
`;

const ChanelNav = styled.nav`
    font-size: 0.9em;
    color: ${({theme}) => theme.textSoft};
`;

export default Channel;
