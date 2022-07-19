import React from "react";
import {
  ContactTooltip,
  HeaderContact,
  HeaderTitle,
  MainHeader,
  MainHeaderContainer,
  MobileContact,
} from "./Header.styled";

import { MdEmail } from "react-icons/md";

const Header = () => {
  return (
    <MainHeaderContainer>
      <MainHeader>
        <HeaderTitle>BTC Mining Profitability Calculator</HeaderTitle>
        <HeaderContact>s5331964@bournemouth.ac.uk</HeaderContact>
        <MobileContact>
          <MdEmail size={30} />
          <ContactTooltip>s5331964@bournemouth.ac.uk</ContactTooltip>
        </MobileContact>
      </MainHeader>
    </MainHeaderContainer>
  );
};

export default Header;
