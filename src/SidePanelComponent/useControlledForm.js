import React from 'react'
import useLocationValidator from "./useLocationValidator"



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


//stepper
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


import StepContent from "./stepContent"
import { Button } from '@material-ui/core';

import { indigo } from '@material-ui/core/colors';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    margin: {
      margin: theme.spacing(1),
    },
  
  }));

  const theme = createMuiTheme({
    palette: {
      primary: indigo,
    },
  });


export default function useControlledForm(props) {
    const classes = useStyles();
    const { toggleStartDisplayError,
        toggleDestinationDisplayError,
        isStartPointValid,
        isDestinationValid,
        startDisplayError,
        destinationDisplayError,
        validDestinationPointSelected,
        validStartPointSelected } = useLocationValidator()



    const [activeStep, setActiveStep] = React.useState(0);
   

    const nextStep = () => {
        console.log(activeStep)

        if (activeStep == 0) {
            if (activeStep == 0 && validStartPointSelected) {
                setActiveStep(activeStep + 1)

            } else {
                toggleStartDisplayError(true);
            }
        }
        else if (activeStep == 1) {
            if (activeStep == 1 && validDestinationPointSelected) {
                setActiveStep(activeStep + 1)
            }
            else {
                toggleDestinationDisplayError(true);
            }

        }
        else if (activeStep >= 2) {
            return
        }

    }

    const prevStep = () => {
        if (activeStep !== 0) {
            setActiveStep(activeStep - 1)
            console.log(activeStep)
        }

    }

    const finish = () => {
        if (props.mode === "") {
            props.toggleModeError(true);
        }
        else{
            props.toggleLoadMatrixService(true)
        }
        //else call prop function to make api call with all the gathered data
    }

    const createForm = () => (

        <List>
            <ListItem style={{ paddingLeft: "0em" }}>
                <div style={{ width: "100%" }}>
                    <Stepper activeStep={activeStep} style={{ paddingTop: "5em", paddingLeft: "0em" }}>
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
                        isStartPointValid={isStartPointValid}
                        isDestinationValid={isDestinationValid}
                        savedStartValue={props.savedStartValue}
                        savedDestinationValue={props.savedDestinationValue}
                        startDisplayError={startDisplayError}
                        destinationDisplayError={destinationDisplayError}
                        updateMode={props.updateMode}
                        mode={props.mode}
                        modeError={props.modeError}
                        updateCarModeInfo = {props.updateCarModeInfo}


                    ></StepContent>

                    <div style={{ paddingTop: "2em", width: "100%", display: "flex", justifyContent: "center" }}>

                    <ThemeProvider theme={theme}>
                        <Button variant="outlined" color="primary" onClick={prevStep}>Prev</Button>
                    </ThemeProvider>

                        {activeStep === 2 ? <Button variant="outlined" color="primary" onClick={finish}>Finish</Button>
                            : <ThemeProvider theme={theme}><Button variant="outlined" color="primary" onClick={nextStep}>Next</Button></ThemeProvider> }
                    </div>


                </div>
            </ListItem>
        </List>
    )


    return {
        createForm
    }


}
