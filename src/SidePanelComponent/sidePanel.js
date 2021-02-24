import { makeStyles } from '@material-ui/core/styles';

//drawer
import Drawer from '@material-ui/core/Drawer';


import React from "react";



import useControlledForm from "./useControlledForm"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    width: 305,
    overflow: "hidden",
  }
}));



function SidePanel(props) {

  const classes = useStyles();

  const { createForm } = useControlledForm(props)

  return (

    <Drawer
      anchor={'left'}
      open={props.drawerToggle}
      onClose={props.toggleDrawer(false)}
      classes={{ paper: classes.paper }}
      BackdropProps={{ invisible: true }}>
      {createForm()}

    </Drawer>

  );



}

export default SidePanel;