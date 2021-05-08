import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Avatar, ListItemAvatar, ListItemText } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
function PaletteList(props) {
  const goToPalette = (id) => {
    props.history.push(`/palette/${id}`);
  };
  const { palletes, classes, deletePalette } = props;
  const [openDelete, setopenDelete] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const openDialog = (id) => {
    setDeletingId(id);
    setopenDelete(true);
  };
  const closeDialog = () => {
    setopenDelete(false);
  };
  const deletePaletteConfirm = () => {
    deletePalette(deletingId);
    setopenDelete(false);
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create palette</Link>
        </nav>

        <div className={classes.palettes}>
          {palletes.map((pallete, i) => (
            <TransitionGroup>
              <CSSTransition key={pallete.id} classNames="fade" timeout={500}>
                <MiniPalette
                  key={pallete.id}
                  {...pallete}
                  handleClick={() => goToPalette(pallete.id)}
                  deletePalette={() => setopenDelete(true)}
                  openDialog={openDialog}
                />
              </CSSTransition>
            </TransitionGroup>
          ))}
        </div>
        <Dialog
          open={openDelete}
          aria-labelledby="delete-dialog-title"
          onClose={closeDialog}
        >
          <DialogTitle id="delete-dialog-title">Delete palette? </DialogTitle>
          <List>
            <ListItem button onClick={deletePaletteConfirm}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={() => setopenDelete(false)}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
