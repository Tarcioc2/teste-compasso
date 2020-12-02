import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
    fetch(`https://api.github.com/repos/${username}/${repository}`).then(
      async (response) => {
        setData(
          response.status === 404
            ? { error: "Repositório não encontrado" }
            : { repo: await response.json() }
        );
      }
    );
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
