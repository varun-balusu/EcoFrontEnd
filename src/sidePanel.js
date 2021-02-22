import { makeStyles } from '@material-ui/core/styles';
//drawer
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

//stepper
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import zIndex from '@material-ui/core/styles/zIndex';


import React from "react";
import Search from "./search";
import StepContent from "./stepContent"
import { Toolbar, IconButton, Typography, Button } from '@material-ui/core';


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



function SidePanel(props){
    
    const classes = useStyles();

    const[activeStep, setActiveStep] = React.useState(0);


    const nextStep = () => {
      if(activeStep < 2){
        setActiveStep(activeStep + 1)
        console.log(activeStep)
      }
  
    }
  
    const prevStep = () => {
      if(activeStep !== 0){
        setActiveStep(activeStep - 1)
        console.log(activeStep)
      }
  
    }

    const list = () => (

        // <List>
        //   <ListItem style={{paddingTop:"5em", paddingLeft:"0.75em"}}>
        //     <Search  panTo = {panTo} changeMarker={marker => setMarkers([...markers, marker])}  ></Search>
        // </ListItem>
        // </List>
        
        <List>
            <ListItem style={{paddingLeft:"0em"}}>
            <div style={{width:"100%"}}>
                <Stepper activeStep={activeStep} style={{paddingTop:"5em", paddingLeft:"0em"}}>
                    <Step>
                    <StepLabel>Start</StepLabel>
                    </Step>
                    <Step>
                    <StepLabel>Destination</StepLabel>
                    </Step>
                    <Step>
                    <StepLabel>Vehicle</StepLabel>
                    </Step>
                </Stepper>
        
                <StepContent panto={props.panTo} setMarkers={props.setMarkers} currentStep={activeStep}></StepContent>
        
                <div style={{paddingTop: "2em", width:"100%", display:"flex", justifyContent:"center"}}>
        
        
                <Button variant="outlined" color="primary" onClick={prevStep}>Prev</Button>  
        
                <Button variant="outlined" color="primary" onClick={nextStep}>Next</Button>
        
                
        
                </div>
                
        
            </div>
            </ListItem>
        </List>
        )



    return (

        <Drawer 
        anchor = {'left'} 
        open = {props.drawerToggle} 
        onClose = {props.toggleDrawer(false)} 
        classes={{ paper: classes.paper }} 
        BackdropProps={{ invisible: true }}>
        {list()}

      </Drawer>

    );



}

export default SidePanel;