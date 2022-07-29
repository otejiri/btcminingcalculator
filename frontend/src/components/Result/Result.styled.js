import styled from "styled-components";

const ResultCard = styled.div`
  border-top: 2px solid black;
  padding: 5px;
`;
const ResultHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  font-weight: bold;
  justify-items: center;
  margin: 0 0 10px 0;
`;
const ResultLine = styled.hr`
  border: 0;
  clear: both;
  display: block;
  width: 100%;
  background-color: brown;
  height: 4px;
`;
const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  justify-items: center;
  align-items: center;
  margin: 0 0 10px 0;

 
}
`;
export { ResultCard, ResultHeader, ResultLine, ResultItem };
