import React, { Fragment, useState } from "react";
import { InputContainer, SelectInput, TextInput } from "./Input.styled";

const Input = (props) => {
  const [selectOption, setSelectOption] = useState(props.option);
  const [label, setLabel] = useState(props.label);
  const [inputValue] = useState(props.inputValue);

  if (!selectOption) {
    setSelectOption([]);
    setLabel("Loading...");
  }

  const option = selectOption?.map((opt) => {
    return (
      <option value={opt.code} key={opt.code}>
        {" "}
        {opt.name}{" "}
      </option>
    );
  });
  return (
    <Fragment>
      <InputContainer>
        {props.type == "select" && (
          <SelectInput offset={-150}>
            <option value="" hidden>
              {label}
            </option>
            {option}
          </SelectInput>
        )}
      </InputContainer>
      {props.type == "text" && (
        <InputContainer>
          <TextInput placeholder={label} value={inputValue} />
        </InputContainer>
      )}
    </Fragment>
  );
};

export default Input;
