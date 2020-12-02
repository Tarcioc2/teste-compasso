import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import imgSearch from "../../assets/img-searching.png";
import imgError from "../../assets/img-error.png";
import imgData from "../../assets/data-img.png";

import {
  Container,
  Main,
  UserInfo,
  RepoList,
  Content,
  Button,
  SearchImg,
  SimpleContainer,
} from "./styles";

import Profile from "../../components/Profile";
import RepositoryListItem from "../../components/RepositoryListItem";
import { APIRepositories, APIUserInfo } from "../../@types";

interface Data {
  user?: APIUserInfo;
  repositories?: APIRepositories[];
  favorites?: APIRepositories[];
  error?: string;
}

const MainPage: React.FC = () => {
  const { username } = useParams();
  const [data, setData] = useState<Data>();

  //Action Controls
  const [repoClicked, setRepoClicked] = useState(false);
  const [favClicked, setFavClicked] = useState(false);

  useEffect(() => {
    if (username !== undefined && username.toString().trim() !== "") {
      Promise.all([fetch(`https://api.github.com/users/${username}`)]).then(
        async (responses) => {
          const [userResponse] = responses;
          if (userResponse.status === 404) {
            setData({ error: "Usuario não encontrado!" });
            return;
          }

          const user = await userResponse.json();

          setData({
            user,
          });
        }
      );
    }
  }, [username]);

  async function HandleClickFavorites() {
    setRepoClicked(false);
    setFavClicked(true);

    Promise.all([
      fetch(`https://api.github.com/users/${username}/starred`),
    ]).then(async (responses) => {
      const [favsResponse] = responses;

      const favorites = await favsResponse.json();

      setData({
        user: data?.user,
        favorites,
      });
    });
  }

  async function HandleClickRepositories() {
    setRepoClicked(true);
    setFavClicked(false);

    Promise.all([fetch(`https://api.github.com/users/${username}/repos`)]).then(
      async (responses) => {
        const [reposResponse] = responses;

        const repositories = await reposResponse.json();

        setData({
          user: data?.user,
          repositories,
        });
      }
    );
  }

  if (data?.error) {
    return (
      <SimpleContainer>
        <SearchImg src={imgError} />
        <h1>{data.error}</h1>
      </SimpleContainer>
    );
  }

  if (!data?.user) {
    return (
      <SimpleContainer>
        <SearchImg src={imgSearch} />
        <h1>{"Busque um usuário na barra acima."}</h1>
      </SimpleContainer>
    );
  }

  return (
    <Container>
      <Main>
        <UserInfo>
          <Profile
            username={data.user.login}
            name={data.user.name}
            profileImg={data.user.avatar_url}
            followers={data.user.followers}
            following={data.user.following}
            location={data.user.location}
            email={data.user.email}
          />
          <Button onClick={HandleClickRepositories}>
            <span>Repos</span>
          </Button>
          <Button onClick={HandleClickFavorites}>
            <span>Starred</span>
          </Button>
        </UserInfo>

        <Content>
          {repoClicked && data.repositories ? (
            <RepoList>
              <h2>Repositórios</h2>
              <div>
                {data.repositories?.map((item) => (
                  <RepositoryListItem
                    key={item.name}
                    username={item.owner.login}
                    reponame={item.name}
                    description={item.description}
                    stars={item.stargazers_count}
                    forks={item.forks}
                  />
                ))}
              </div>
            </RepoList>
          ) : favClicked && data.favorites ? (
            <RepoList>
              <h2>Favoritos</h2>
              <div>
                {data.favorites?.map((item) => (
                  <RepositoryListItem
                    key={item.name}
                    username={item.owner.login}
                    reponame={item.name}
                    description={item.description}
                    stars={item.stargazers_count}
                    forks={item.forks}
                  />
                ))}
              </div>
            </RepoList>
          ) : (
            <RepoList>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <SearchImg src={imgData} />
                <h2>
                  Selecione um filtro para visualizar dados sobre repositórios.
                </h2>
              </div>
            </RepoList>
          )}
        </Content>
      </Main>
    </Container>
  );
};

export default MainPage;
