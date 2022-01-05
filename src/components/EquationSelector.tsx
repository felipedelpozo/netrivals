import React, { useState } from "react";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useCollection } from "react-query-firestore";

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

  const [dialogValue, setDialogValue] = useState<FormulaOption>({
    name: "",
  });

  const handleClose = () => {
    setDialogValue({
      name: "",
      value: "",
    });

    toggleOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setValue(dialogValue);

    add(dialogValue);

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
              setDialogValue({
                name: newValue,
                value: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
              value: "",
            });
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
      <Dialog open={open}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new formula</DialogTitle>
          <DialogContent>
            <Box sx={{ flex: 1, flexDirection: "column" }}>
              <Box>
                <TextField
                  sx={{ width: "100%" }}
                  autoFocus
                  margin="dense"
                  id="name"
                  value={dialogValue.name}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      name: event.target.value,
                    })
                  }
                  label="name"
                  type="text"
                  variant="standard"
                />
              </Box>
              <Box>
                <TextField
                  sx={{ width: "100%" }}
                  margin="dense"
                  id="name"
                  value={dialogValue.value}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      value: event.target.value,
                    })
                  }
                  label="formula"
                  variant="standard"
                />
              </Box>
              <DialogContentText sx={{ py: 2 }}>
                Use any expression supported in MathJS.{" "}
              </DialogContentText>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, mb: 1 }}>
            <Button
              sx={{ pr: 4 }}
              target="_blank"
              href="https://mathjs.org/docs/expressions/parsing.html"
            >
              Documentation
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EquationSelector;
