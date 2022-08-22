import React, { Fragment, useEffect, useState } from "react";
import { Countries } from "../../common/country";
import { Currencies } from "../../common/currency";
import { ResultSorter } from "../../common/result-sorter";

import Input from "../../ui/Input";
import Result from "../Result/Result";
import { Main, ResultContainer } from "./Body.styled";

const CountryList = Countries;
const CurrencyList = Currencies;

const Body = () => {
  // https://arxiv.org/pdf/1112.4980v1.pdf
  const [data, setData] = useState([]);
  const [profitValue, setProfitValue] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [sortBy, setSortBy] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [freq, setFreq] = useState("th");
  const [showResult, setShowResult] = useState(false);

  const onProfitValueChange = (val) => {
    setProfitValue(val);
  };

  const onCurrencyChange = (val) => {
    setCurrency(val);
  };

  const onProfitSubmit = () => {
    if (!profitValue.match(/^-?\d+$/)) {
      return false;
    }
    const url = `http://localhost:3001/?profit=${profitValue}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json["data"]))
      .then(setShowResult(true))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setData(ResultSorter(sortedData, sortBy));
  }, [sortBy]);

  useEffect(() => {
    // setData([]);
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
              label={`Expected Daily Profit in ${currency}`}
            />
            <Input
              type="text"
              label={`Electricity Cost in ${currency} Per KWh (optional)`}
            />
            <Input
              type="text"
              label={`Total cost of other expenses in ${currency} (optional)`}
            />
            <button
              onClick={() => onProfitSubmit()}
              style={{ width: "100%", height: "50px" }}
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
