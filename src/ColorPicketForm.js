import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useStyles from "./styles/ColorPickerFormStyles";

function ColorPicketForm(props) {
  const classes = useStyles();
  const { paletteIsfull, colors, addNewColor } = props;
  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setNewColorName] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "newColorName") setNewColorName(e.target.value);
  };
  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ color }) => color !== currentColor)
    );
  });

  //   useEffect(() => {});
  return (
    <div>
      <ChromePicker
        className={classes.picker}
        color={currentColor}
        onChangeComplete={updateCurrentColor}
      />
      <ValidatorForm
        onSubmit={() => {
          addNewColor(currentColor, newColorName);
          setNewColorName("");
        }}
      >
        <TextValidator
          variant="filled"
          margin="normal"
          placeholder="Color name"
          className={classes.colorNameInput}
          value={newColorName}
          name="newColorName"
          onChange={handleChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter color name",
            "Color name must be unique",
            "Color already used",
          ]}
        />

        <Button
          className={classes.addColor}
          variant="contained"
          color="primary"
          type="submit"
          style={{
            backgroundColor: paletteIsfull() ? "grey" : currentColor,
          }}
          disabled={paletteIsfull()}
        >
          {paletteIsfull() ? "Palette full" : "Add color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPicketForm;
