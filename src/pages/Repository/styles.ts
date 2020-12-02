import styled, { css } from "styled-components";
import { RiBookMarkLine, RiStarLine } from "react-icons/ri";
import { AiOutlineFork } from "react-icons/ai";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  > p {
    font-size: 16px;
  }
`;

export const Breadcrumb = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-size: 18px;
  > a {
    color: var(--link);
    text-decoration: none;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
    &.username {
      margin-left: 8px;
    }
    &.reponame {
      font-weight: 600;
    }
  }
  > span {
    padding: 0 5px;
  }
`;

const iconCSS = css`
  width: 16px;
  height: 16px;
  fill: var(--icon);
  flex-shrink: 0;
`;

export const RepoIcon = styled(RiBookMarkLine)`
  ${iconCSS}
`;

export const StarIcon = styled(RiStarLine)`
  ${iconCSS}
`;

export const ForkIcon = styled(AiOutlineFork)`
  ${iconCSS}
`;

export const Stats = styled.ul`
  margin-top: 16px;
  display: flex;
  align-items: center;
  > li {
    display: flex;
    align-items: center;
    margin-right: 9px;
    > * {
      margin-right: 7px;
      color: var(--gray);
    }
  }
`;

export const SearchImg = styled.img`
  width: 50%;
  align-items: center;
  @media (min-width: 768px) {
    width: 40%;
  }
`;

export const SimpleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
