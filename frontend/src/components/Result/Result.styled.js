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
export {
  TableContainer,
  MainTable,
  TableNo,
  TableHeader,
  DeviceTable,
  DeviceTableCell,
  SummaryRow,
};
