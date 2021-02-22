import Search from "./search";
//combo
import {
  Combobox,
  ComboboxInput,
  
} from "@reach/combobox"



function StepContent(props){
  switch (props.currentStep) {
    case 0:
      return (
      <div style={{ display:"flex", justifyContent:"center", maxWidth:305}}>

      <Search  
        panTo = {props.panTo} 
        changeMarker={props.setMarkers}
        placeholder = "Starting Location">

      
        
      </Search> 
        

      </div> );
    case 1:
      return (
        <div div style={{ display:"flex", justifyContent:"center", maxWidth:305}}>

        <Search  
        panTo = {props.panTo} 
        changeMarker={props.setMarkers}
        placeholder = "Destination">
          
        </Search>
          
  
        </div> 
      );
    case 2:
      return (
        <div style={{ display:"flex", alignItems:"center", maxWidth:305, flexDirection: "column"}}>
          <div className="search">
            <Combobox>
              <ComboboxInput placeholder="Make"></ComboboxInput>
            </Combobox>
          </div>
          <div className="search" style={{paddingTop:"1em"}}>
            <Combobox>
              <ComboboxInput placeholder="Model"></ComboboxInput>
            </Combobox>
          </div>
          <div className="search" style={{paddingTop:"1em"}}>
            <Combobox>
              <ComboboxInput placeholder="Year"></ComboboxInput>
            </Combobox>
          </div>
          
        </div>

      )
    default:
      return <div></div>
  }
}

export default StepContent;