import React from "react";
import { withStyles } from "@material-ui/core";
// withStyles & makeStyles

//useStyles = makeStyles ( )
const style = {
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "320px",
    height: "100%",
    backgroundColor: "#253053",
  },
};
// function
//const classes = useStyles();
const SideMenu = (props) => {
    const { classes } = props;
  return <div className={classes.sideMenu}>SideMenu</div>;
};
export default withStyles(style)(SideMenu);