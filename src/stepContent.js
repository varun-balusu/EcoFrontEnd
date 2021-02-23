import Search from "./search";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';



//combo
import {
  Combobox,
  ComboboxInput,
  
} from "@reach/combobox"



function StepContent(props){

  const[selectValue, setSelectValue] = React.useState()
  const[modeError, setModeError] = React.useState(false)

  const handleChange = (event) => {
    setSelectValue(event.target.value)
    setModeError(true);
  }




  switch (props.currentStep) {
    case 0:
      return (
      <div style={{ display:"flex", justifyContent:"center", maxWidth:305}} key="search1Cont">

      <Search  
        panTo = {props.panto} 
        changeMarker={props.setMarkers}
        placeholder = "Starting Location"
        searchNumber = {1}
        setStartPoint={props.setStartPoint}
        setDestination = {props.setDestination}
        key="step-1"
        errorMessage ="Please Choose A Location From The Dropdown"
        isStartPointValid={props.isStartPointValid}
        isDestinationValid = {props.isDestinationValid}
        savedStartValue = {props.savedStartValue}
        savedDestinationValue = {props.savedDestinationValue}
        startDisplayError = {props.startDisplayError}
        destinationDisplayError = {props.destinationDisplayError}>



      
        
      </Search> 
        

      </div> );
    case 1:
      return (
        <div style={{ display:"flex", justifyContent:"center", maxWidth:305}} key="search2Cont">
          
            <Search  
                panTo = {props.panto} 
                changeMarker={props.setMarkers}
                placeholder = "Destination"
                searchNumber = {2}
                setStartPoint={props.setStartPoint}
                setDestination = {props.setDestination}
                key="step-2"
                errorMessage ="Please Enter A Destination"
                isStartPointValid={props.isStartPointValid}
                isDestinationValid = {props.isDestinationValid}
                savedStartValue = {props.savedStartValue}
                savedDestinationValue = {props.savedDestinationValue}
                startDisplayError = {props.startDisplayError}
                destinationDisplayError = {props.destinationDisplayError}>
                  
                
            </Search>

          
  
        </div> 
      );
    case 2:
      return (
        <div style={{ display:"flex", alignItems:"center", maxWidth:305, flexDirection: "column"}} key="search3Cont"> 

            <div style={{paddingBottom:"1em"}}>
              <FormControl error={modeError}>
                <InputLabel>Select Mode</InputLabel>
                  <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectValue}
                    style={{minWidth: 200}}
                    onChange={handleChange}
                  >
                    <MenuItem value="Car">Car</MenuItem>
                    <MenuItem value="Bus">Bus</MenuItem>
                    <MenuItem value="Motorcycle">Motorcycle</MenuItem>
                    <MenuItem value="Transit-Rail">Transit-Rail</MenuItem>
                  </Select>
                  {modeError && <FormHelperText>Please Select a Mode of Transportation</FormHelperText>}
              </FormControl>
            </div>



          <div className="search" key="make">
            <Combobox key="jj">
              <ComboboxInput placeholder="Make" key="makeInput"></ComboboxInput>
            </Combobox>
          </div>
          <div className="search" style={{paddingTop:"1em"}} key="model">
            <Combobox key="kk">
              <ComboboxInput placeholder="Model" key="modelInput"></ComboboxInput>
            </Combobox>
          </div>
          <div className="search" style={{paddingTop:"1em"}} key="year">
            <Combobox key="gg">
              <ComboboxInput placeholder="Year" key="yearInput"></ComboboxInput>
            </Combobox>
          </div>
          
        </div>

      )
    default:
      return <div key="empty"></div>
  }
}

export default StepContent;