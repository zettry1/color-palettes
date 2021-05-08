import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";
import ColorPicketForm from "./ColorPicketForm";
import PaletteFormNav from "./PaletteFormNav";
import useStyles from "./styles/NewPaletteFormStyles";

function NewPaletteForm(props) {
  const MAX_COLORS = 20;
  const { savePalette: appSavePalette, palettes } = props;
  const [colors, setColors] = useState(palettes[0].colors);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const paletteIsfull = () => {
    return colors.length >= MAX_COLORS;
  };

  const addNewColor = (currentColor, newColorName) => {
    const newColor = { color: currentColor, name: newColorName };
    setColors((prevColor) => [...prevColor, newColor]);
  };

  const savePalette = (newPaletteObj) => {
    newPaletteObj.id = newPaletteObj.paletteName
      .toLowerCase()
      .replace(/\s/g, "-");
    newPaletteObj.colors = colors;
    appSavePalette(newPaletteObj);
    props.history.push("/");
  };

  const deletePalette = (colorName) => {
    const newColors = colors.filter((color) => color.name !== colorName);
    setColors(newColors);
  };

  const addRandomColors = () => {
    const allColors = palettes.map((p) => p.colors).flat();

    const rand = Math.floor(Math.random() * allColors.length);

    const randomColor = allColors[rand];
    if (!paletteIsfull()) setColors([...colors, randomColor]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };
  const clearColors = () => {
    setColors([]);
  };
  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        savePalette={savePalette}
        palettes={palettes}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.drawerContainer}>
          <Typography variant="h4" gutterBottom>
            Design your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              onClick={addRandomColors}
            >
              Random Color
            </Button>
          </div>
          {/*  */}
          <ColorPicketForm
            addNewColor={addNewColor}
            paletteIsfull={paletteIsfull}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          axis="xy"
          onSortEnd={onSortEnd}
          colors={colors}
          deletePalette={deletePalette}
        />
      </main>
    </div>
  );
}

export default NewPaletteForm;
