import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import gitApi from "../../services/githubApi";

import imgSearch from "../../assets/img-searching.png";
import imgError from "../../assets/img-error.png";

import {
  Container,
  Breadcrumb,
  RepoIcon,
  Stats,
  StarIcon,
  ForkIcon,
  SimpleContainer,
  SearchImg,
} from "./styles";

import { APIRepositories } from "../../@types";

interface Data {
  repo?: APIRepositories;
  error?: string;
}

const Repository: React.FC = () => {
  const { username, repository } = useParams();
  const [data, setData] = useState<Data>();

  useEffect(() => {
    gitApi.getUserRepositorie(username, repository).then(async (response) => {
      setData(
        response.status === 404
          ? { error: "Repositório não encontrado" }
          : { repo: await response.data }
      );
    });
  }, [repository, username]);

  if (data?.error) {
    return (
      <SimpleContainer>
        <SearchImg src={imgError} />
        <h1>{data.error}</h1>
      </SimpleContainer>
    );
  }

  if (!data?.repo) {
    return (
      <SimpleContainer>
        <SearchImg src={imgSearch} />
        <h1>{"Busque um repositório na barra acima."}</h1>
      </SimpleContainer>
    );
  }

  return (
    <Container>
      <Breadcrumb>
        <RepoIcon />

        <Link className={"username"} to={`/${username}`}>
          {username}
        </Link>

        <span>/</span>

        <a
          className={"repository"}
          href={`https://github.com/${username}/${repository}`}
          target="_Blank"
          rel="noreferrer"
        >
          {repository}
        </a>
      </Breadcrumb>

      <p>{data.repo.description}</p>

      <Stats>
        <li>
          <StarIcon />
          <b>{data.repo.stargazers_count}</b>
        </li>
        <li>
          <ForkIcon />
          <b>{data.repo.forks}</b>
        </li>
      </Stats>
    </Container>
  );
};

export default Repository;
