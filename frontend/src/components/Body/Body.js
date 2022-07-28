import React, { useState } from "react";
import { Countries } from "../../common/country";
import { Currencies } from "../../common/currency";
import { Converter } from "../../common/hash-converter";
import Input from "../../ui/Input";
import { Main } from "./Body.styled";

const CountryList = Countries;
const CurrencyList = Currencies;

const Body = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [profitValue, setProfitValue] = useState("");
  const tem = Converter("eh", "th");
  const onProfitValueChange = (val) => {
    setProfitValue(val);
  };

  // React.useEffect(() => {
  //   const url = "https://randomuser.me/api/?results=15";
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((json) => setData(json['results']))
  //     .catch((error) => console.log(error));
  // }, []);

  // React.useEffect(() => {
  //   if (data.length !== 0) {
  //     setIsLoading(false);
  //   }
  //   console.log(data);
  // }, [data]);

  const onProfitSubmit = () => {
    const url = `http://localhost:3001/?profit=${profitValue}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json["data"]))
      .catch((error) => console.log(error));

    if (data.length !== 0) {
      setIsLoading(false);
    }
    console.log(data);
  };

  return (
    <Main>
      <Input
        type="select"
        option={CountryList}
        name="Country"
        label=" --Choose Mining Country--"
      />
      <Input type="select" name="Currency" option={CurrencyList} label="USD" />
      <Input
        type="text"
        textInputHandler={(val) => onProfitValueChange(val)}
        label="Profit (daily)"
      />
      <Input type="text" label="Power Consumption (optional)" />
      <Input type="text" label="Cost Per KWh (optional)" />
      <button
        onClick={() => onProfitSubmit()}
        style={{ width: "100%", height: "50px" }}
      >
        Submit
      </button>
    </Main>
  );
};

export default Body;
