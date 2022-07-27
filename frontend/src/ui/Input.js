import React, { Fragment, useState } from "react";
import {
  InputContainer,
  InputLabel,
  LabelContainer,
  SelectInput,
  TextInput,
} from "./Input.styled";

const Input = (props) => {
  const [selectOption, setSelectOption] = useState(props.option);
  const [label, setLabel] = useState(props.label);
  const [inputValue] = useState(props.inputValue);
  const [selectName] = useState(props.name);

  if (props.type === "select" && !selectOption) {
    setSelectOption([]);
    setLabel("Loading...");
  }

  const option = selectOption?.map((opt) => {
    let val;
    let name;
    if (selectName.toLowerCase() === "country") {
      val = opt.code;
      name = opt.name;
    }

    if (selectName.toLowerCase() === "currency") {
      val = opt;
      name = opt;
    }
    return (
      <option value={val} key={val}>
        {" "}
        {name}{" "}
      </option>
    );
  });
  return (
    <Fragment>
      {/* if input is select input */}

      {props.type == "select" && (
        <InputContainer>
          <LabelContainer>
            <InputLabel>{selectName}</InputLabel>
          </LabelContainer>

          <SelectInput offset={-150}>
            <option value="" hidden>
              {label}
            </option>
            {option}
          </SelectInput>
        </InputContainer>
      )}
      {/* end of select input */}

      {/* if text input */}

      {props.type == "text" && (
        <InputContainer>
          <LabelContainer>
            <InputLabel>{label}</InputLabel>
          </LabelContainer>
          <TextInput value={inputValue} />
        </InputContainer>
      )}

      {/* end of text input */}
    </Fragment>
  );
};

export default Input;
