import styled from "styled-components";

const InputContainer = styled.div`
  width: 100%;
  padding: 5px 0px;
`;

const SelectInput = styled.select`
  padding: 10px;
  border-radius: 5px;
  height: 50px;
  width: 100%;
  border: 0px solid transparent;
  option {
    color: black;
    background: white;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
    width: 50px;
  }
  &:focus {
    border-left: 5px solid brown;
    outline: none;
  }
`;

const TextInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  border: 0px solid transparent;
  &:focus {
    border-left: 5px solid brown;
    outline: none;
  }
`;
export { InputContainer, SelectInput, TextInput };
