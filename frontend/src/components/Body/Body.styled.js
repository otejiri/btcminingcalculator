import styled from "styled-components";
import { devices } from "../../common/device.styled";

const Main = styled.div`
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  background: rgb(0, 0, 0, 0.1);

  @media ${devices.laptop}, ${devices.tablet} {
    max-width: 50%;
    margin: 20px auto;
  }
`;

const ResultContainer = styled.div`
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  background: rgb(0, 0, 0, 0.1);

  @media ${devices.laptop}, ${devices.tablet} {
    max-width: 50%;
    margin: 20px auto;
  }
`;

export { Main, ResultContainer };
