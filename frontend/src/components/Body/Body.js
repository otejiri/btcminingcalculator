import React from "react";
import { Countries } from "../../common/country";
import Input from "../../ui/Input";
import { Main } from "./Body.styled";

const CountryList = Countries;

const Body = () => {
  return (
    <Main>
      <Input
        type="select"
        option={CountryList}
        label=" --Choose Mining Country--"
      />
      <Input type="select" option={CountryList} label=" --Select Currency--" />
      <Input type="text" label="Hashing Power" />
      <Input type="text" label="Power Consumption" />
      <Input type="text" label="Cost Per KWh" />
      <Input type="text" label="Pool Fee" />
    </Main>
  );
};

export default Body;
