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
      <Fragment>
        <div style={{ fontWeight: "bold", marginLeft: "20px" }}>
          {" "}
          {device.name}{" "}
        </div>

        <ResultItem key={device.name}>
          <div> {count} </div>
          <div>{device.type.toUpperCase()}</div>
          <div> {Math.round(Converter(device.speed, "th", "h"))} TH/s </div>
          <div> {device.power} </div>
          <div> {device.num} </div>
          <div> $56565</div>
        </ResultItem>
        <div style={{ width: "100%" }}>{alignSpecifications(device.specs)}</div>

        <ResultLine />
      </Fragment>
    );
  });
  return (
    <Fragment>
      {itemsList.length > 0 && <ResultCard>{items}</ResultCard>}
    </Fragment>
  );
};

export default Result;
