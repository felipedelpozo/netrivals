import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import FormulaModel from "@netrivals/models/formula";

type AddEquationProps = {
  open: boolean;
  handleSubmit: (value: FormulaModel) => void;
  handleClose: (event: any) => void;
};

const AddEquation = ({
  open,
  handleSubmit,
  handleClose,
}: AddEquationProps): JSX.Element => {
  const [dialogValue, setDialogValue] = useState<FormulaModel>({
    name: "",
  });

  const onSubmit = (event: any) => {
    event.preventDefault();

    handleSubmit(dialogValue);
    handleClose(event);
  };

  return (
    <Dialog open={open}>
      <form onSubmit={onSubmit}>
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
  );
};

export default AddEquation;
