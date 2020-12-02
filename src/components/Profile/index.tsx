import React from "react";

import {
  Container,
  Flex,
  ProfileAvatar,
  Row,
  PeopleIcon,
  Column,
  LocationIcon,
  EmailIcon,
} from "./styles";

interface Props {
  username: string;
  name: string;
  profileImg: string;
  followers: number;
  following: number;
  email?: string;
  location?: string;
}

const Profile: React.FC<Props> = ({
  username,
  name,
  profileImg,
  followers,
  following,
  email,
  location,
}) => {
  return (
    <Container>
      <Flex>
        <ProfileAvatar src={profileImg} alt={username} />

        <div>
          <h1>{name}</h1>
          <h2>{username}</h2>
        </div>
      </Flex>

      <Row>
        <li>
          <PeopleIcon />
          <b>{followers}</b>
          <span>Seguidores</span>
          <span>·</span>
          <b>{following}</b>
          <span>Seguindo</span>
        </li>
      </Row>
      <Column>
        {location && (
          <li>
            <LocationIcon />
            <span>{location}</span>
          </li>
        )}
        {email && (
          <li>
            <EmailIcon />
            <span>{email}</span>
          </li>
        )}
      </Column>
    </Container>
  );
};

export default Profile;
