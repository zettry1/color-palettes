import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
    };
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
  }

  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }
  changeLevel = (newLevel) => {
    this.setState({
      level: newLevel,
    });
  };
  changeFormat = (value) => {
    this.setState({ format: value });
  };
  render() {
    const { format } = this.state;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.id + color.name}
        name={color.name}
        background={color[format]}
        showLink={false}
      />
    ));

    return (
      <div className="Pallete">
        <NavBar
          showingAllColors={false}
          level={this.props.palette.level}
          //   changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        {/* <h1>Single color</h1> */}
        <div className="Pallete-colors">{colorBoxes}</div>

        <PaletteFooter
          emoji={this.props.palette.emoji}
          paletteName={this.props.palette.paletteName}
        />
      </div>
    );
  }
}

export default SingleColorPalette;
