import React, { Fragment, useState } from "react";
import { SelectInput } from "./Input.styled";

const Input = (props) => {
  const [selectOption, setSelectOption] = useState(props.option);
  const [selectLabel, setSelectLabel] = useState(props.label);

  if (!selectOption) {
    setSelectOption([]);
    setSelectLabel("Loading...");
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
      <SelectInput>
        <option value="" hidden>
          {selectLabel}
        </option>
        {option}
      </SelectInput>
    </Fragment>
  );
};

export default Input;
