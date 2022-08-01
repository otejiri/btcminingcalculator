import React, { Fragment, useEffect, useState } from "react";
import { Countries } from "../../common/country";
import { Currencies } from "../../common/currency";
import { Converter } from "../../common/hash-converter";
import Input from "../../ui/Input";
import Result from "../Result/Result";
import { Main, ResultContainer } from "./Body.styled";

const CountryList = Countries;
const CurrencyList = Currencies;

const Body = () => {
  const [data, setData] = useState([]);
  const [profitValue, setProfitValue] = useState("");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    console.log(data);
  }, [data]);
  const onProfitValueChange = (val) => {
    setProfitValue(val);
  };
  const onCurrencyChange = (val) => {
    console.log(val);
    setCurrency(val);
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
  const hashPower = parseFloat(Converter(data["hashPower"], "th", "h")).toFixed(
    2
  );
  const hashTotal = parseFloat(
    Converter(data["devicesHashTotal"], "th", "h")
  ).toFixed(2);
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
            inputHandler={(val) => onCurrencyChange(val)}
          />
          <Input
            type="text"
            inputHandler={(val) => onProfitValueChange(val)}
            label="Profit (daily)"
          />
          <Input
            type="text"
            label={`Electricity ${currency} Cost Per KWh (optional)`}
          />
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
          <div>
            {data["noOfDevices"]} | {hashPower} | {hashTotal}
          </div>
          <Result devicesList={data["devices"]} />
        </ResultContainer>
      )}
    </Fragment>
  );
};

export default Body;
