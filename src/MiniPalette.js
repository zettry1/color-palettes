import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";
function MiniPallete(props) {
  const {
    classes,
    paletteName,
    emoji,
    colors,
    handleClick,
    deletePalette,
    id,
  } = props;
  const miniColorBoxes = colors.map((co) => {
    return (
      <div
        key={co.name}
        className={classes.miniColor}
        style={{ backgroundColor: co.color }}
      />
    );
  });
  const removePalatte = (e) => {
    e.stopPropagation();
    deletePalette(id);
  };
  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.delete}>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{
            transition: "all 0.3s ease-in-out",
          }}
          onClick={removePalatte}
        />
      </div>

      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPallete);
