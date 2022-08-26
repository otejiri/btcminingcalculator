import React, { Fragment, useEffect, useState } from "react";
import { HashConverter } from "../../common/hash-converter";
import { NumberWithCommas } from "../../common/number-comma-formatter";
import { Paginate } from "../../common/paginate";

import {
  DeviceTable,
  DeviceTableCell,
  MainTable,
  TableContainer,
  TableHeader,
  TableNo,
  SummaryRow,
  Pagination,
  PageControls,
} from "./Result.styled";

const Result = (props) => {
  const [itemsList, setItemsList] = useState(props.deviceList);
  const [freq, setFreq] = useState(props.frequency);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});

  useEffect(() => {
    setItemsList(props.devicesList);
    setPage(Paginate(currentPage, 10, props.devicesList.length));
    setCurrentPage(1);
    if (props.devicesList.length < 0) {
      console.log("failed");
    }
  }, [props.devicesList]);

  useEffect(() => {
    setFreq(props.frequency);
  }, [props.frequency]);

  useEffect(() => {
    setPage(Paginate(currentPage, 10, props.devicesList.length));
  }, [currentPage]);

  const pageHandler = (direction) => {
    if (direction === "next" && page.nextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    if (direction === "prev" && page.previousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  let count = page.startFrom;

  const devices = itemsList
    ?.slice(page.startFrom, page.endAt)
    .map((item, index) => {
      const totalDevice = item["totalDevice"];
      const totalHash = HashConverter(item["totalHash"], "h", freq);
      const totalCost = NumberWithCommas(Math.round(item["totalCost"]));
      const totalNoise = NumberWithCommas(item["totalNoise"]);
      const totalPower = NumberWithCommas(item["totalPower"]);
      const device = item["devices"];

      count = count + 1;

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
                ${NumberWithCommas(device.cost)}
              </a>
            </DeviceTableCell>
          </tr>
        );
      });

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
                    {NumberWithCommas(totalHash)}
                    &nbsp;
                    {freq.toUpperCase()}/s
                  </SummaryRow>
                  <SummaryRow even={even}>
                    {NumberWithCommas(totalPower)}
                  </SummaryRow>
                  <SummaryRow even={even}>{totalNoise}</SummaryRow>
                  <SummaryRow even={even}></SummaryRow>
                  <SummaryRow even={even}>{totalDevice}</SummaryRow>
                  <SummaryRow even={even}>${totalCost}</SummaryRow>
                </tr>
              </DeviceTable>
            </td>
          </tr>
        </MainTable>
      );
    });

  return (
    <Fragment>
      {itemsList?.length > 0 && (
        <PageControls>
          <p>
            Page {currentPage} of {page.pageCount}
          </p>
          <Pagination current={currentPage + 1}>
            <a onClick={() => pageHandler("prev")}>&laquo;</a>
            {Array.from(Array(page.pageCount).keys()).map((p) => {
              const page = p + 1;
              return <a onClick={() => setCurrentPage(page)}>{page}</a>;
            })}
            <a onClick={() => pageHandler("next")}>&raquo;</a>
          </Pagination>
        </PageControls>
      )}
      <TableContainer>{devices}</TableContainer>
    </Fragment>
  );
};

export default Result;
