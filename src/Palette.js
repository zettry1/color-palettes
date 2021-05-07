import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./Navbar";
import "./Palette.css";
import PaletteFooter from "./PaletteFooter";
export default class Pallete extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
  }
  changeLevel = (newLevel) => {
    this.setState({
      level: newLevel,
    });
    console.log(newLevel);
  };
  changeFormat = (value) => {
    this.setState({ format: value });
  };
  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map((color) => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        id={color.id}
        paletteId={id}
        showingFullPalette={true}
      />
    ));
    return (
      <div className="Pallete">
        <NavBar
          showingAllColors
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        {/* Navbar goes here */}
        <div className="Pallete-colors">{colorBoxes}</div>
        <PaletteFooter emoji={emoji} paletteName={paletteName} />
        {/* footer goes here */}
      </div>
    );
  }
}
