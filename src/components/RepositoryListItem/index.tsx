import React from "react";

import {
  Container,
  Body,
  Footer,
  RepoIcon,
  StarIcon,
  ForkIcon,
} from "./styles";

interface Props {
  username: string;
  reponame: string;
  description?: string;
  stars: number;
  forks: number;
}

const RepositoryListItem: React.FC<Props> = ({
  username,
  reponame,
  description,
  stars,
  forks,
}) => {
  return (
    <Container>
      <Body>
        <header>
          <RepoIcon />
          <a
            href={`https://github.com/${username}/${reponame}`}
            target="_Blank"
          >
            {reponame}
          </a>

          <p>{description}</p>
        </header>
      </Body>

      <Footer>
        <ul>
          <li>
            <StarIcon />
            <span>{stars}</span>
          </li>
          <li>
            <ForkIcon />
            <span>{forks}</span>
          </li>
        </ul>
      </Footer>
    </Container>
  );
};

export default RepositoryListItem;
