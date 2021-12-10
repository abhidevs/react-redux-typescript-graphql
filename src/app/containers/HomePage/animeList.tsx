import React from "react";
import { createSelector } from "reselect";
import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import { makeSelectAnimePage } from "./selector";

const AnimeListContainer = styled.div`
  margin-top: 30px;
  max-width: 1280px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px 40px;
`;

const AnimeItemContainer = styled.div`
  width: 11em;
  height: max-content;
  display: flex;
  flex-direction: column;
`;

const AnimeCover = styled.div`
  width: auto;
  height: 14em;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AnimeTitle = styled.h5`
  margin: 8px 0 5px 0;
  font-size: 15px;
  color: #000;
  font-weight: 600;
  text-align: center;
`;

const AnimeInfo = styled.p`
  margin: 2px 0 0 0;
  font-size: 13px;
  color: #000;
  font-weight: normal;
  text-align: center;
`;

const stateSelector = createSelector(makeSelectAnimePage, (animePage) => ({
  animePage,
}));

const AnimeList = () => {
  const { animePage } = useAppSelector(stateSelector);

  const isEmptyAnimePage =
    !animePage || !animePage.media || animePage.media.length === 0;

  if (isEmptyAnimePage) return <h3>Loading...</h3>;

  return (
    <AnimeListContainer>
      {animePage?.media &&
        animePage.media.map((anime) => (
          <AnimeItemContainer>
            <AnimeCover>
              <img src={anime?.coverImage?.extraLarge || ""} alt="" />
            </AnimeCover>
            <AnimeTitle>{anime?.title?.english}</AnimeTitle>
            <AnimeInfo>Average Score: {anime?.averageScore}</AnimeInfo>
            <AnimeInfo>Episodes: {anime?.episodes}</AnimeInfo>
          </AnimeItemContainer>
        ))}
    </AnimeListContainer>
  );
};

export default AnimeList;
