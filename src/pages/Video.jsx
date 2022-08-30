import React, { useEffect, useState } from 'react';

import { dislikeFunction, likeFunction } from '../services/userFeedback';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchVideoById } from '../services/fetchVideos';
import { fetchChannelInfo } from '../services/fetchChannelInfo';
import { fetchSuccess } from '../redux/videoSlice';
import { format } from 'timeago.js';

import styled from 'styled-components';
import Card from '../components/Card';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import Comments from '../components/Comments';

const Video = () => {

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await fetchVideoById(path);
        const channelRes = await fetchChannelInfo(videoRes.userId);
        setChannel(channelRes);
        dispatch(fetchSuccess(videoRes));
      } catch (error) {}
    }
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await likeFunction(currentVideo.id);
  };

  const handleDislike = async () => {
    await dislikeFunction(currentVideo.id);
  };

  return (
    <Container>
        <Content>
          <VideoWrapper>
            <iframe
              style={{ borderRadius: "15px" }}
              width="100%" 
              height="720" 
              src="https://www.youtube.com/embed/6hdMspVzslY" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </VideoWrapper>
          <Title>{ currentVideo.title }</Title>
          <Details>
            <Info>{ currentVideo.views } views • { format(currentVideo.createdAt) }</Info>
            <Buttons>
              <Button onClick={ handleLike }>
                { 
                currentVideo.likes?.includes(currentUser.id) ? ( 
                    <ThumbUpAltIcon />
                  ) : ( 
                    <ThumbUpOffAltOutlinedIcon /> 
                  ) }{ " " }
                { currentVideo.likes?.length }
              </Button>
              <Button onClick={ handleDislike }>
              { 
                currentVideo.dislikes?.includes(currentUser.id) ? ( 
                    <ThumbDownAltIcon />
                  ) : ( 
                    <ThumbDownOffAltIcon />
                ) }{ " " }
                 Dislike
              </Button>
              <Button>
                <ReplyOutlinedIcon /> Share
              </Button>
              <Button>
                <AddTaskOutlinedIcon /> Save
              </Button>
            </Buttons>
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              <ChannelImage src={ channel.img }/>
              <ChannelDetail>
                <ChannelName>{ channel.username }</ChannelName>
                <ChannelCounter>{ channel.subscribedUsers?.length } Subscribers</ChannelCounter>
                <Description>
                  { currentVideo.description }
                </Description>
              </ChannelDetail>
            </ChannelInfo>
            <SubscribeButon>Subscribe</SubscribeButon>
          </Channel>
          <Hr />
          <Comments />
        </Content>
        {/* <Recomendation>
          <Card type="sm" />
          <Card type="sm" />
          <Card type="sm" />
          <Card type="sm" />
          <Card type="sm" />
          <Card type="sm" />
          <Card type="sm" />
          <Card type="sm" />
        </Recomendation> */}
    </Container>
  );
};

const Container = styled.section`
    padding: 50px;
    display: flex;
    gap: 24px;
`;

const Content = styled.section`
    flex: 5;
`;

const VideoWrapper = styled.section`

`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color:  ${({theme}) => theme.text};
`;

const Details = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color:  ${({theme}) => theme.textSoft};
`;

const Buttons = styled.section`
  display: flex;
  gap: 20px;
  color:  ${({theme}) => theme.text};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  color:  ${({theme}) => theme.text};
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme}) => theme.soft};
`;

const Recomendation = styled.section`
    flex: 2;
`;

const Channel = styled.section`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.section`
  display: flex;
  gap: 20px;
`;

const SubscribeButon = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
`;

const ChannelImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color:  ${({theme}) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color:  ${({theme}) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

export default Video;
