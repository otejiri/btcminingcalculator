import React, { Fragment, useEffect, useState } from "react";
import { Countries } from "../../common/country";
import { Currencies } from "../../common/currency";
import { Converter } from "../../common/hash-converter";
import { objSort } from "../../common/sort-objects";
import Input from "../../ui/Input";
import Result from "../Result/Result";
import { Main, ResultContainer } from "./Body.styled";

const CountryList = Countries;
const CurrencyList = Currencies;

const Body = () => {
  const [data, setData] = useState([]);
  const [profitValue, setProfitValue] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [sortBy, setSortBy] = useState("totalDevice");

  useEffect(() => {}, [data]);
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

  // start of result sorting
  function sortResults() {
    var args = arguments,
      array = args[0],
      case_sensitive,
      keys_length,
      key,
      desc,
      a,
      b,
      i;

    if (typeof arguments[arguments.length - 1] === "boolean") {
      case_sensitive = arguments[arguments.length - 1];
      keys_length = arguments.length - 1;
    } else {
      case_sensitive = false;
      keys_length = arguments.length;
    }

    return array?.sort(function (obj1, obj2) {
      for (i = 1; i < keys_length; i++) {
        key = args[i];
        if (typeof key !== "string") {
          desc = key[1];
          key = key[0];
          a = obj1[args[i][0]];
          b = obj2[args[i][0]];
        } else {
          desc = false;
          a = obj1[args[i]];
          b = obj2[args[i]];
        }

        if (case_sensitive === false && typeof a === "string") {
          a = a.toLowerCase();
          b = b.toLowerCase();
        }

        if (!desc) {
          if (a < b) return -1;
          if (a > b) return 1;
        } else {
          if (a > b) return -1;
          if (a < b) return 1;
        }
      }
      return 0;
    });
  } //end of objSort() function

  console.log(sortResults(data, sortBy));
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
