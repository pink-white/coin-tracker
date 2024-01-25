import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingAnime = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

const Loading = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  animation: ${LoadingAnime} 2s linear infinite;
`;

const Loader = () => {
  return (
    <Loading>
      <FontAwesomeIcon icon={faSpinner} />
    </Loading>
  );
};

export default Loader;
