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


export default function useControlledForm(props) {
    const { toggleStartDisplayError,
        toggleDestinationDisplayError,
        isStartPointValid,
        isDestinationValid,
        startDisplayError,
        destinationDisplayError,
        validDestinationPointSelected,
        validStartPointSelected } = useLocationValidator()



    const [activeStep, setActiveStep] = React.useState(0);


    const [mode, setMode] = React.useState("")

    const [modeError, setModeError] = React.useState(false)


    function handleChangeMode(option) {
        setMode(option.target.value)
    }

    React.useEffect(() => {

        if (mode !== "") {
            setModeError(false);
        }

    }, [mode])

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
        if (mode === "") {
            setModeError(true);
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
                        updateMode={handleChangeMode}
                        mode={mode}
                        modeError={modeError}

                    ></StepContent>

                    <div style={{ paddingTop: "2em", width: "100%", display: "flex", justifyContent: "center" }}>


                        <Button variant="outlined" color="primary" onClick={prevStep}>Prev</Button>

                        {activeStep === 2 ? <Button variant="outlined" color="primary" onClick={finish}>Finish</Button>
                            : <Button variant="outlined" color="primary" onClick={nextStep}>Next</Button>}
                    </div>


                </div>
            </ListItem>
        </List>
    )


    return {
        createForm
    }


}
