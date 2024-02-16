import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { darkAtom } from "../atoms";

const ThemeBtn = styled.div`
  height: 55px;
  width: 55px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  font-size: 25px;
  color: ${(props) => props.theme.accentColor};
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  background-color: ${(props) => props.theme.boxColor};
  &:hover {
    opacity: 0.7;
  }
`;

const ChangeTheme = () => {
  const isDark = useRecoilValue(darkAtom);
  const setThemeAtom = useSetRecoilState(darkAtom);
  const toggleThemeAtom = () => setThemeAtom((prev) => !prev);

  return (
    <ThemeBtn onClick={toggleThemeAtom}>
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
    </ThemeBtn>
  );
};

export default ChangeTheme;
