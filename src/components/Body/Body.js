import React from "react";
import { Countries } from "../../common/country";
import Input from "../../ui/Input";
import { Main } from "./Body.styled";

const CountryList = Countries;

const Body = () => {
  return (
    <Main>
      <Input option={CountryList} label="Mining country" />
    </Main>
  );
};

export default Body;
