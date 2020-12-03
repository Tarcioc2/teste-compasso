import styled from "styled-components";
import { RiBookMarkLine } from "react-icons/ri";

export const Container = styled.div`
  --horizontalPadding: 16px;
  --verticalPadding: 24px;

  overflow: hidden;

  padding: --verticalPadding(--verticalPadding) var(----horizontalPadding);
`;
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1280px;

  @media (min-width: 768px) {
    flex-direction: row;
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

export const UserInfo = styled.div`
  padding: 0 var(--horizontalPadding);
  @media (min-width: 768px) {
    width: 25%;
  }
`;
export const Content = styled.div`
  padding: 0 var(--horizontalPadding);
  @media (min-width: 768px) {
    width: 75%;
  }
`;

export const RepoList = styled.div`
  margin-top: var(--verticalPadding);

  > h2 {
    font-size: 16px;
    font-weight: normal;
  }
  > div {
    margin-top: 8px;

    display: grid;
    grid-gap: 16px;

    grid-template-columns: 1fr 1fr;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px 0;
`;

export const RepoIcon = styled(RiBookMarkLine)`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

export const Button = styled.button`
  text-decoration: none;
  margin-top: 24px;
  margin-right: 10px;
  background: var(--gray-dark);
  padding: 12px 17px;
  border-radius: 24px;
  width: max-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  > span {
    color: var(--primary);
  }
`;

export const Tab = styled.div`
  background: var(--primary);

  .content {
    display: flex;
    align-items: center;
    width: min-content;

    padding: 14px 16px;

    border-bottom: 2px solid var (--orange);
  }

  .label {
    font-size: 14px;
    padding: 0 7px;
    font-weight: 600;
  }

  .count {
    font-size: 12px;
    background: var(--ticker);
    padding: 2px 6px;
    border-radius: 24px;
  }

  .line {
    display: flex;
    width: 200vw;
    border-bottom: 1px solid var(--border);
    margin-left: -50vw;
  }

  &.mobile {
    margin-top: var(--verticalPadding);

    .content {
      margin: 0 auto;
    }

    @media (min-width: 768px) {
      display: none;
    }
  }

  &.desktop {
    display: none;

    @media (min-width: 768px) {
      display: unset;

      .wrapper {
        display: flex;
        margin: 0 auto;
        max-width: 1280px;
      }

      .offset {
        width: 25%;
        margin-right: var(--horizontalPadding);
      }
    }
  }
`;
