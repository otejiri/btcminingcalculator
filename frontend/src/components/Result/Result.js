import React, { Fragment, useEffect, useState } from "react";
import { Converter } from "../../common/hash-converter";
import { ResultCard, ResultItem, ResultLine } from "./Result.styled";
import { BrowserRouter as Router, Link } from "react-router-dom";
const Result = (props) => {
  const [itemsList, setItemsList] = useState([]);
  useEffect(() => {
    setItemsList(props.devicesList);
  }, [props.devicesList]);
  //   const alignSpecifications = (specs) => {
  //     const it = [];
  //     for (const key in specs) {
  //       it.push(`${key}: ${specs[key]}`);
  //     }
  //     return it.map((spec, index) => {
  //       return (
  //         <div style={{ fontSize: "small" }} key={spec}>
  //           {spec}
  //         </div>
  //       );
  //     });
  //   };
  const items = itemsList.map((item, index) => {
    const count = index + 1;
    const device = item;
    return (
      <div key={device.id}>
        <div style={{ fontWeight: "bold", marginLeft: "20px" }}>
          {" "}
          {device.name}{" "}
          <sup
            style={{
              fontSize: "xx-small",
              background: "orange",
              color: "black",
              padding: "3px",
              borderRadius: "5px",
            }}
          >
            {" "}
            X {item.times}
          </sup>
        </div>

        <ResultItem key={device.name}>
          <div> {count} </div>
          <div
            style={{
              background: "#4267B2",
              color: "white",
              padding: "2px",
              borderRadius: "2px",
            }}
          >
            ASIC{" "}
          </div>
          <div> {Converter(device.hash, "th", "h")} TH/s </div>
          <div> {device.power} </div>
          <div> {device.times} </div>
          <div>
            <a
              style={{ decoration: "none" }}
              href={device.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              {device.cost}
            </a>
          </div>
        </ResultItem>
        <div style={{ width: "100%", fontSize: "small" }}>
          Release: {item.release} | Noise: {item.noise}db
        </div>

        <ResultLine />
      </div>
    );
  });
  return (
    <Fragment>
      {itemsList.length > 0 && <ResultCard>{items}</ResultCard>}
    </Fragment>
  );
};

export default Result;
