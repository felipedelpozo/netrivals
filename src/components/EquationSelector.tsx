import React, { useState } from "react";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useCollection } from "react-query-firestore";

import AddEquation from "@netrivals/components/AddEquation";
import TextFieldDotted from "@netrivals/components/TextFieldDotted";
import FormulaModel from "@netrivals/models/formula";

const filter = createFilterOptions();

interface FormulaOption extends FormulaModel {
  inputValue?: string;
}

type EquationSelectorProps = {
  currentValue: FormulaModel | null;
  onChange: (event: any, value: FormulaModel) => void;
  onClose?: () => void;
};

const EquationSelector = ({
  currentValue = null,
  onChange,
  ...props
}: EquationSelectorProps): JSX.Element => {
  const { data, add, error } = useCollection<FormulaOption>("formulas");

  const [value, setValue] = useState<FormulaOption | null>(currentValue);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };

  const handleSubmit = (value: FormulaModel) => {
    setValue(value);
    add(value);
    onChange(null, value);
    handleClose();
  };

  if (!data || error) {
    return <></>;
  }

  return (
    <>
      <Autocomplete
        {...props}
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              toggleOpen(true);
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
          } else {
            setValue(newValue);
            onChange(event, newValue as FormulaModel);
          }
        }}
        filterOptions={(options: any, params: any) => {
          if (!options || !params) {
            return options;
          }

          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              name: `Add "${params.inputValue}"`,
              inputValue: params.inputValue,
            });
          }

          return filtered;
        }}
        id="formulas-select"
        options={data as FormulaModel[]}
        getOptionLabel={(option) => option?.value || ""}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: "100%" }}
        freeSolo
        renderInput={(params) => (
          <TextFieldDotted {...params} label={value?.name || "Formula"} />
        )}
      />
      <AddEquation
        open={open}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </>
  );
};

export default EquationSelector;
