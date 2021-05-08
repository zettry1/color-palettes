import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import PaletteMetaForm from "./PaletteMetaForm";
import useStyles from "./styles/PaletteFormNavStyles";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
function PaletteFormNav(props) {
  const { open, palettes, handleDrawerOpen, savePalette } = props;
  const classes = useStyles();
  const [formShowing, setformShowing] = useState(false);

  const showForm = () => {
    setformShowing(true);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <AddToPhotosIcon />
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Go back
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={() => showForm(true)}
            className={classes.button}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          savePalette={savePalette}
          palettes={palettes}
          setformShowing={setformShowing}
        />
      )}
    </div>
  );
}

export default PaletteFormNav;
