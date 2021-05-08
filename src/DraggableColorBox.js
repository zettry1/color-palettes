import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)",
    },
  },
  boxContent: {
    position: "absolute",
    padding: "10px",
    width: "100%",
    left: "0px",
    bottom: "0px",
    color: "rgba(0,0,0,0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },

  deleteIconStyle: {
    transition: "all 0.3s ease-in-out",
  },
};
const DraggableColorBox = SortableElement((props) => {
  const { classes, name, deletePalette } = props;
  console.log("render draggablecolorbox");
  return (
    <div
      key={name}
      className={classes.root}
      style={{ backgroundColor: props.color }}
    >
      <div className={classes.boxContent}>
        <span>{name}</span>
        <span className={classes.deleteIconStyle}>
          <DeleteIcon onClick={() => deletePalette(name)} />
        </span>
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
