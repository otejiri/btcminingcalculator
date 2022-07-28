import React, { Fragment, useEffect, useState } from "react";
import { Countries } from "../../common/country";
import { Currencies } from "../../common/currency";
import Input from "../../ui/Input";
import Result from "../Result/Result";
import { Main, ResultContainer } from "./Body.styled";

const CountryList = Countries;
const CurrencyList = Currencies;

const Body = () => {
  const [data, setData] = useState([]);
  const [profitValue, setProfitValue] = useState("");

  useEffect(() => {
    console.log(data);
  }, [data]);
  const onProfitValueChange = (val) => {
    setProfitValue(val);
  };

  const onProfitSubmit = () => {
    if (!profitValue.match(/^-?\d+$/)) {
      console.log("error");
      return false;
    }
    const url = `http://localhost:3001/?profit=${profitValue}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json["data"]))
      .catch((error) => console.log(error));
  };
  useEffect(() => {}, [data]);

  return (
    <Fragment>
      <Main>
        <div>
          <Input
            type="select"
            option={CountryList}
            name="Country"
            label=" --Choose Mining Country--"
          />
          <Input
            type="select"
            name="Currency"
            option={CurrencyList}
            label="USD"
          />
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
        </div>
      </Main>
      {data["devices"]?.length > 0 && (
        <ResultContainer>
          <Result devicesList={data["devices"]} />
        </ResultContainer>
      )}
    </Fragment>
  );
};

export default Body;
