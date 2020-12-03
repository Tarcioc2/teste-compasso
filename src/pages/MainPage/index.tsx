import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gitUserApi from "../../services/githubApi";

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
  Row,
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username !== undefined && username.toString().trim() !== "") {
      Promise.all([gitUserApi.getUserInfo(username)]).then(
        async (responses) => {
          const [userResponse] = responses;
          if (userResponse.status === 404) {
            setData({ error: "Usuario não encontrado!" });
            return;
          }

          setData({
            user: userResponse.data,
          });
        }
      );
    }
  }, [username]);

  async function HandleClickFavorites() {
    setRepoClicked(false);
    setFavClicked(true);
    setLoading(true);

    Promise.all([gitUserApi.getUserFavorites(username)])
      .then(async (responses) => {
        const [favsResponse] = responses;

        setData({
          user: data?.user,
          favorites: favsResponse.data,
        });
        setLoading(false);
      })
      .catch((err) => {
        alert("Ocorreu um erro com a requisição");
      });
  }

  async function HandleClickRepositories() {
    setRepoClicked(true);
    setFavClicked(false);
    setLoading(true);

    Promise.all([gitUserApi.getUserRepositories(username)])
      .then(async (responses) => {
        const [reposResponse] = responses;

        setData({
          user: data?.user,
          repositories: reposResponse.data,
        });
        setLoading(false);
      })
      .catch((err) => {
        alert("Ocorreu um erro com a requisição");
      });
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
          <Row>
            <Button onClick={HandleClickRepositories}>
              <span>Repos</span>
            </Button>
            <Button onClick={HandleClickFavorites}>
              <span>Starred</span>
            </Button>
          </Row>
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
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h2>Carregando...</h2>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <SearchImg src={imgData} />
                  <h2>
                    Selecione um filtro para visualizar dados sobre
                    repositórios.
                  </h2>
                </div>
              )}
            </RepoList>
          )}
        </Content>
      </Main>
    </Container>
  );
};

export default MainPage;
