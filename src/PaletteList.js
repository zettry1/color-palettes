import React from "react";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyles";
import { Link } from "react-router-dom";
function PaletteList(props) {
  const goToPalette = (id) => {
    props.history.push(`/palette/${id}`);
  };
  const { palletes, classes, deletePalette } = props;
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create palette</Link>
        </nav>

        <div className={classes.palettes}>
          {palletes.map((pallete, i) => (
            <MiniPalette
              key={i}
              {...pallete}
              handleClick={() => goToPalette(pallete.id)}
              deletePalette={deletePalette}
            />
            // <Link to={`/palette/${pallete.id}`}>{pallete.paletteName}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
