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

    const[validStartPointSelected, setvalidStartPointSelected] = React.useState(false);

    const[validDestinationPointSelected, setValidDestinationPointSelected] = React.useState(false);

    const[startDisplayError, setStartDisplayError] = React.useState(false);

    const[destinationDisplayError, setDestinationDisplayError] = React.useState(false);


    function isStartPointValid(flag){
      setvalidStartPointSelected(true);
    }

    function isDestinationValid(flag){
      setValidDestinationPointSelected(flag);
    }

    React.useEffect(() => {
      if(validStartPointSelected){
        setStartDisplayError(false)
      }

    }, [validStartPointSelected])

    React.useEffect(() => {
      if(validDestinationPointSelected){
        setDestinationDisplayError(false)
      }

    }, [validDestinationPointSelected])



    const nextStep = () => {
      console.log(activeStep)
      
      if (activeStep == 0) {
        if(activeStep == 0 && validStartPointSelected){
          setActiveStep(activeStep + 1) 

        } else{
          setStartDisplayError(true);
        } 
      }
      else if (activeStep == 1){
        if(activeStep == 1 && validDestinationPointSelected){
          setActiveStep(activeStep + 1) 
        }
        else{
          setDestinationDisplayError(true);
        }

      }
      else if(activeStep >= 2){
        return
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
                    <StepLabel>Mode</StepLabel>
                    </Step>
                </Stepper>
        
                <StepContent 
                  panto={props.panTo} 
                  setMarkers={props.setMarkers} 
                  currentStep={activeStep}
                  setStartPoint={props.setStartPoint}
                  setDestination={props.setDestination}
                  isStartPointValid = {isStartPointValid}
                  isDestinationValid = {isDestinationValid}
                  savedStartValue = {props.savedStartValue}
                  savedDestinationValue = {props.savedDestinationValue}
                  startDisplayError = {startDisplayError}
                  destinationDisplayError = {destinationDisplayError}

                  ></StepContent>
        
                <div style={{paddingTop: "2em", width:"100%", display:"flex", justifyContent:"center"}}>
        
        
                <Button variant="outlined" color="primary" onClick={prevStep}>Prev</Button>  
        
                {activeStep === 2 ? <Button variant="outlined" color="primary" onClick={nextStep}>Finish</Button> 
                    :<Button variant="outlined" color="primary" onClick={nextStep}>Next</Button>}
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