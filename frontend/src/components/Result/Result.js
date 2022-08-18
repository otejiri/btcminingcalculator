import React, { Fragment, useEffect, useState } from "react";
import { HashConverter } from "../../common/hash-converter";
import { NumberWithCommas } from "../../common/number-comma-formatter";

import {
  DeviceTable,
  DeviceTableCell,
  MainTable,
  TableContainer,
  TableHeader,
  TableNo,
  SummaryRow,
} from "./Result.styled";

const Result = (props) => {
  const [itemsList, setItemsList] = useState(props.deviceList);
  const [freq, setFreq] = useState(props.frequency);

  useEffect(() => {
    setItemsList(props.devicesList);
  }, [props.devicesList]);

  useEffect(() => {
    setFreq(props.frequency);
  }, [props.frequency]);

  const devices = itemsList?.map((item, index) => {
    const totalDevice = item["totalDevice"];
    const totalHash = HashConverter(item["totalHash"], "h", freq);
    const totalCost = NumberWithCommas(Math.round(item["totalCost"]));
    const totalNoise = item["totalNoise"];
    const totalPower = NumberWithCommas(item["totalPower"]);

    const device = item["devices"];

    const deviceRow = device.map((device) => {
      return (
        <tr>
          <DeviceTableCell>{device.name}</DeviceTableCell>
          <DeviceTableCell>
            {NumberWithCommas(HashConverter(device.iterHash, "h", freq))}
            &nbsp;
            {freq.toUpperCase()}/s
          </DeviceTableCell>
          <DeviceTableCell>{NumberWithCommas(device.power)}</DeviceTableCell>
          <DeviceTableCell>{device.noise}</DeviceTableCell>
          <DeviceTableCell>{device.release}</DeviceTableCell>
          <DeviceTableCell>{device.timesInto}</DeviceTableCell>
          <DeviceTableCell>
            <a target="_blank" href={device.link}>
              {NumberWithCommas(device.cost)}
            </a>
          </DeviceTableCell>
        </tr>
      );
    });

    const count = index + 1;
    const even = index % 2 === 0;
    return (
      <MainTable even={even}>
        <tr>
          <TableNo even={even}>{count}</TableNo>
          <td>
            <DeviceTable>
              <TableHeader even={even}>
                <DeviceTableCell>Name</DeviceTableCell>
                <DeviceTableCell>Hash</DeviceTableCell>
                <DeviceTableCell>Power (Watts)</DeviceTableCell>
                <DeviceTableCell>Noise</DeviceTableCell>
                <DeviceTableCell>Release</DeviceTableCell>
                <DeviceTableCell>X</DeviceTableCell>
                <DeviceTableCell>Cost</DeviceTableCell>
              </TableHeader>

              {deviceRow}

              <tr>
                <SummaryRow even={even}>Total</SummaryRow>
                <SummaryRow even={even} freq={freq}>
                  {totalHash}
                  &nbsp;
                  {freq.toUpperCase()}/s
                </SummaryRow>
                <SummaryRow even={even}>{totalPower}</SummaryRow>
                <SummaryRow even={even}>{totalNoise}</SummaryRow>
                <SummaryRow even={even}></SummaryRow>
                <SummaryRow even={even}>{totalDevice}</SummaryRow>
                <SummaryRow even={even}>{totalCost}</SummaryRow>
              </tr>
            </DeviceTable>
          </td>
        </tr>
      </MainTable>
    );
  });

  return (
    <Fragment>
      <TableContainer>{devices}</TableContainer>
    </Fragment>
  );
};

export default Result;
