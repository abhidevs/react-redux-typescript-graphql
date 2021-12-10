import React, { useEffect } from "react";
import styled from "styled-components";
import animeService from "../../services/animeService";
import { Dispatch } from "@reduxjs/toolkit";
import { GetAnimePage } from "../../services/animeService/__generated__/GetAnimePage";
import { setAnimePage } from "./homePageSlice";
import { useAppDispatch } from "../../hooks";
import AnimeList from "./animeList";

interface IHomePageProps {}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setAnimePage: (page: GetAnimePage["Page"]) => dispatch(setAnimePage(page)),
});

export function HomePage(props: IHomePageProps) {
  const { setAnimePage } = actionDispatch(useAppDispatch());

  const fetchAnimePage = async () => {
    const animePage = await animeService
      .getAnimePage(0, 20)
      .catch((err) => console.log("Error occured: ", err));

    console.log(animePage);
    if (animePage) setAnimePage(animePage);
  };

  useEffect(() => {
    fetchAnimePage();
  }, []);

  return (
    <Container>
      <h1>Anime Jungle</h1>
      <AnimeList />
    </Container>
  );
}
