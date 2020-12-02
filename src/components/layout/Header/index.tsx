import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, GitLogo, SearchForm } from "./styles";

import { ThemeName } from "../../../styles/themes";

interface Props {
  themeName: ThemeName;
  setThemeName: (newName: ThemeName) => void;
}

const Header: React.FC<Props> = ({ themeName, setThemeName }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); //remover comportamento padrão do enter

    navigate("/" + searchInput.toLowerCase().trim());
  }

  function changeTheme() {
    setThemeName(themeName === "light" ? "dark" : "light");
  }

  return (
    <Container>
      <GitLogo onClick={changeTheme} />
      <SearchForm onSubmit={handleSubmit}>
        <input
          placeholder="Digite o nome de usuario do github"
          value={searchInput}
          onChange={(st) => setSearchInput(st.currentTarget.value)}
        />
      </SearchForm>
    </Container>
  );
};

export default Header;
