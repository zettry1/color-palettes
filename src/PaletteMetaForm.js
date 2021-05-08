import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
function PaletteMetaForm(props) {
  const { palettes, savePalette, setformShowing } = props;
  const [open, setOpen] = useState(true);
  const [stage, setStage] = useState("form");
  const [newPaletteName, setnewPaletteName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setformShowing(false);
  };

  const handleChange = (e) => {
    setnewPaletteName(e.target.value);
  };
  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== newPaletteName.toLowerCase()
      )
    );
  }, [newPaletteName]);

  const showEmojiPicker = () => {
    setOpen(false);
    setStage("emoji");
  };
  const saveAll = (eomji) => {
    const newPaleneete = { paletteName: newPaletteName, emoji: eomji.native };
    savePalette(newPaleneete);
  };
  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={() => setformShowing(false)}>
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <Picker title="Pick a Palette Emojie" onSelect={saveAll} />
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Saving new palette</DialogTitle>
        <ValidatorForm onSubmit={() => showEmojiPicker()}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for you palette. Must be unique
            </DialogContentText>
            <TextValidator
              value={newPaletteName}
              name="newPaletteName"
              label="Palette Name"
              fullWidth
              margin="normal"
              onChange={handleChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter palette name",
                "Palette name already taken",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;
