import React, { Fragment, useEffect, useState } from "react";
import { Countries } from "../../common/country";
import { Currencies } from "../../common/currency";
import { ResultSorter } from "../../common/result-sorter";
import { HashConverter } from "../../common/hash-converter";
import Input from "../../ui/Input";
import Result from "../Result/Result";
import { Main, ResultContainer } from "./Body.styled";
import { PoolList } from "../../common/pool";

const CountryList = Countries;
const CurrencyList = Currencies;

const Body = () => {
  const [data, setData] = useState([]);
  const [profitValue, setProfitValue] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [country, setCountry] = useState("US");
  const [sortBy, setSortBy] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [freq, setFreq] = useState("th");
  const [showResult, setShowResult] = useState(false);
  const [strategy, setStrategy] = useState("Solo Miner");
  const [countryRisk, setCountryRisk] = useState("Unknown");

  const onProfitValueChange = (val) => {
    setProfitValue(val);
  };
  const onStrategyChange = (val) => {
    setStrategy(val);
  };
  const onCurrencyChange = (val) => {
    setCurrency(val);
  };
  const onCountryChange = (val) => {
    setCountry(val);
  };
  const onProfitSubmit = () => {
    if (!profitValue.match(/^[0-9]+([.][0-9]+)?$/)) {
      alert("Enter valid amount");
      return false;
    }
    const url = `http://localhost:3001/?profit=${profitValue}&pool=${strategy}&country=${country}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json["risk"]);
        setCountryRisk(json["risk"]);
        return setData(json["data"]);
      })
      .then(setShowResult(true))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setData(ResultSorter(sortedData, sortBy));
  }, [sortBy]);

  useEffect(() => {}, [countryRisk]);

  useEffect(() => {
    // setData([]);
    console.log(data);
  }, [data]);

  useEffect(() => {
    // setData([]);
  }, [freq]);

  const onSortChange = (event) => {
    setSortedData(data);
    setData([]);
    const sortValue = event.target.value;
    setSortBy(sortValue);
  };

  const onFreqChange = (event) => {
    const freqValue = event.target.value;
    setFreq(freqValue);
  };
  const clearResults = () => {
    setShowResult(false);
    setFreq("th");
    setProfitValue("");
    setCountryRisk("Unknown");

    setData([]);
  };
  return (
    <Fragment>
      {!showResult && (
        <Main>
          <div>
            <Input
              type="select"
              option={CountryList}
              name="Country"
              inputHandler={(val) => onCountryChange(val)}
              label="United States"
            />
            <Input
              type="select"
              name="Currency"
              option={CurrencyList}
              inputHandler={(val) => onCurrencyChange(val)}
            />
            <Input
              type="select"
              option={PoolList}
              name="Strategy"
              inputHandler={(val) => onStrategyChange(val)}
              label="Solo Miner"
            />
            <Input
              type="text"
              inputHandler={(val) => onProfitValueChange(val)}
              label={`Expected Daily Profit in ${currency}`}
            />
            <button
              onClick={() => onProfitSubmit()}
              style={{
                background: "brown",
                color: "white",
                width: "100%",
                height: "50px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Submit
            </button>
          </div>
        </Main>
      )}
      {showResult && (
        <ResultContainer>
          <div style={{ cursor: "pointer" }} onClick={clearResults}>
            <u>
              <h3> &lt; Back to calculator</h3>
            </u>
          </div>
          <p>{data.length > 0 ? data.length : "Loading"} results</p>
          {data.length > 0 && (
            <Fragment>
              <div>
                <p>
                  <span
                    style={{
                      background: "white",
                      padding: "3px",
                      marginRight: "3px",
                    }}
                  >
                    Profit Hash:{" "}
                  </span>{" "}
                  <span style={{ color: "blue", fontWeight: "bold" }}>
                    {HashConverter(+data[0]?.totalHash, "h", freq)}{" "}
                    {freq.toUpperCase()}/s
                  </span>
                </p>
                <p>
                  <span
                    style={{
                      background: "white",
                      padding: "3px",
                      marginRight: "3px",
                    }}
                  >
                    Country Risk Level:
                  </span>{" "}
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {countryRisk ? countryRisk.toLocaleUpperCase() : "Unknown"}
                  </span>
                </p>
                <label>Sort by </label>
                <select value={sortBy} onChange={onSortChange}>
                  <option value="" hidden>
                    Select sort value
                  </option>
                  <option value="totalCost">Price</option>
                  <option value="totalPower">Power</option>
                  <option value="totalDevice">Devices</option>
                  <option value="totalNoise">Noise</option>
                </select>
              </div>
              <div>
                <label>Frequecy </label>
                <select value={freq} onChange={onFreqChange}>
                  <option value="th" hidden>
                    Th/s
                  </option>
                  <option value="h">H/s</option>
                  <option value="mh">Mh/s</option>
                  <option value="gh">Gh/s</option>
                  <option value="th">Th/s</option>
                </select>
              </div>
            </Fragment>
          )}
          <Result devicesList={data} frequency={freq} />
        </ResultContainer>
      )}
    </Fragment>
  );
};

export default Body;
