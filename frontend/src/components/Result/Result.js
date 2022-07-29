import React, { Fragment, useEffect, useState } from "react";
import { Converter } from "../../common/hash-converter";
import {
  ResultCard,
  ResultHeader,
  ResultItem,
  ResultLine,
} from "./Result.styled";

const Result = (props) => {
  const [itemsList, setItemsList] = useState([]);
  useEffect(() => {
    setItemsList(props.devicesList);
  }, [props.devicesList]);
  const alignSpecifications = (specs) => {
    const it = [];
    for (const key in specs) {
      it.push(`${key}: ${specs[key]}`);
    }
    return it.map((spec, index) => {
      return <div style={{ fontSize: "small" }}>{spec}</div>;
    });
  };
  const items = itemsList.map((item, index) => {
    const count = index + 1;
    const device = item["info"];
    return (
      <div>
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
            X {item.num}
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
            {device.type.toUpperCase()}
          </div>
          <div> {Math.round(Converter(device.speed, "th", "h"))} TH/s </div>
          <div> {device.power} </div>
          <div> {device.num} </div>
          <div> $56565</div>
        </ResultItem>
        <div style={{ width: "100%" }}>{alignSpecifications(device.specs)}</div>

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
