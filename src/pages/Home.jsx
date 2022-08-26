import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { fetchVideos } from '../services/fetchVideos';

const Home = ({ type }) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const callFetchVideos = async () => {
      const ramdomVideos = await fetchVideos(type);

      setVideos(ramdomVideos);
    };
    callFetchVideos();
  }, [type]);

  return (
    <Container>
        { videos.map((video) => (
          <Card key={ video._id } video={ video } />
        )) }
    </Container>
  );
};

const Container = styled.section`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px 60px;
`;

export default Home;
