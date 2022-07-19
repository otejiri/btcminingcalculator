import styled from "styled-components";
import { devices } from "../../common/device.styled";
const MainHeaderContainer = styled.div``;
const MainHeader = styled.div`
  display: grid;
  grid-template-areas: ". .";

  box-sizing: border-box;
  justify-content: space-between;
  background: #24292f;
  color: white;
  width: 100%;
  height: auto;
  padding: 10px;
`;
const HeaderTitle = styled.span`
  align-self: center;
  @media ${devices.laptop}, ${devices.tablet} {
    font-size: 25px;
  }
  font-weight: bold;
`;

const HeaderContact = styled.span`
  align-self: center;
  display: none;
  @media ${devices.laptop}, ${devices.tablet} {
    display: block;
  }
`;
const ContactTooltip = styled.div`
  visibility: hidden;
  width: auto;
  background: rgb(0, 0, 0, 0.9);
  border-radius: 6px;
  padding: 5px 5px;
  right: 1px;
  border: 2px solid grey;
  line-height: normal;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
`;
const MobileContact = styled.span`
  cursor: pointer;
  display: inline-block;
  margin-top: 5px;
  margin-left: 55px;
  &:hover ${ContactTooltip} {
    visibility: visible;
  }
  @media ${devices.laptop}, ${devices.tablet} {
    display: none;
    visibility: hidden;
  }
`;

export {
  MainHeaderContainer,
  MainHeader,
  HeaderTitle,
  HeaderContact,
  MobileContact,
  ContactTooltip,
};
