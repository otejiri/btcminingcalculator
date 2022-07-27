import React from "react";
import { Countries } from "../../common/country";
import { Currencies } from "../../common/currency";
import getDevices from "../../common/devices-lookup";
import convertHash from "../../common/hash-converter";
import Input from "../../ui/Input";
import { Main } from "./Body.styled";

const CountryList = Countries;
const CurrencyList = Currencies;

const Body = () => {
  const tem = convertHash("eh", "th");
  const mm = getDevices();
  console.log(mm);
  return (
    <Main>
      <Input
        type="select"
        option={CountryList}
        name="Country"
        label=" --Choose Mining Country--"
      />
      <Input type="select" name="Currency" option={CurrencyList} label="GBP" />
      <Input type="text" label="Hashing Power" />
      <Input type="text" label="Power Consumption" />
      <Input type="text" label="Cost Per KWh" />
      <Input type="text" label="Pool Fee" />
    </Main>
  );
};

export default Body;
