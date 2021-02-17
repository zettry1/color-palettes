import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import Select from "@material-ui/core/Select";
import { IconButton, MenuItem } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Snackbar } from "@material-ui/core";
import { Link } from "react-router-dom";
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      open: false,
    };
  }
  handleFormatChange = (e) => {
    this.setState({ format: e.target.value, open: true }, () => {
      this.props.handleChange(this.state.format);
    });
  };
  handleClose = (e) => {
    this.setState({ open: false });
  };
  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;
    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">Orgil Color</Link>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              onAfterChange={changeLevel}
              step={100}
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">Hex- #ffffff</MenuItem>
            <MenuItem value="rgb">RGB- rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA- rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format Changed! {this.state.format.toUpperCase()}{" "}
            </span>
          }
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          onClose={this.handleClose}
          action={[
            <IconButton
              onClick={this.handleClose}
              color={"inherit"}
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}
