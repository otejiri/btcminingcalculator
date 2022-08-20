import styled from "styled-components";
import { devices } from "../../common/device.styled";

const TableContainer = styled.div`
  overflow: auto;
  width: 100%;
`;
const MainTable = styled.table`
  border: 5px solid white;
  margin: 30px 0;
  cell-padding: 0;
  cell-spacing: 0;
  text-align: center;
  vertical-align: middle;
  border-collapse: collapse;
  width: 100%;
`;

const TableNo = styled.td`
  background: ${(props) => (props.even ? "black" : "white")};
  font-weight: bold;
  color: ${(props) => (props.even ? "white" : "black")};
  min-width: 20px;
`;
const TableHeader = styled.tr`
  background: ${(props) => (props.even ? "brown" : "#24292f")};
  color: white;
  font-weight: bold;
`;

const DeviceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  & tr:nth-of-type(even) {
    background: white;
  }
`;

const DeviceTableCell = styled.td`
  border: 1px solid black;
  word-wrap: break-word;
`;
const SummaryRow = styled.td`
  background: ${(props) => (props.even ? "brown" : "#24292f")};
  font-weight: bold;
  color: white;
  word-wrap: break-word;
`;
const Pagination = styled.div`
  display: inline-block;
  & a {
    color: black;
    float: left;
    padding: 2px 4px;
    text-decoration: none;
    border: 1px solid #24292f;
    background: white;
    cursor: pointer;
  }
  & a:nth-child(${(props) => props.current}) {
    background: brown;
    color: white;
    font-weight: bold;
  }

  & a:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  & a:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
const PageControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export {
  TableContainer,
  MainTable,
  TableNo,
  TableHeader,
  DeviceTable,
  DeviceTableCell,
  SummaryRow,
  Pagination,
  PageControls,
};
