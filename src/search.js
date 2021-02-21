import TextField from '@material-ui/core/TextField';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox"
  
import "@reach/combobox/styles.css";


function Search( props){

    // console.log(props)

    const placeholder = props.placeholder
  
  
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
      requestOptions: {
        location: {lat: () =>  43.653225, lng: () => -79.383186},
        radius: 200 * 1000
      },
  
    });
  
    const handleSelect = async (address) => {
            console.log(address)
            setValue(address, false);
            clearSuggestions();
            try {
              const results = await getGeocode({address});
              const {lat, lng} = await getLatLng(results[0])
  
              props.changeMarker({lat, lng})
            }
            catch(error){
              console.log(error);
            }
   }
  
   
  
  
      return (
       
      // <Container style={{height:"100vh", width:"25vw", float:'left',padding:0, margin:0, backgroundColor:'#f9fbe7'}}>
          <div className="search">
            <Combobox onSelect={handleSelect}>
              <ComboboxInput
                value={value}
                onChange = {(e) => {
                  setValue(e.target.value)
                  console.log(e.target.value)
                }}
                disabled={!ready}
                
                placeholder={placeholder}
              />
              <ComboboxPopover portal={false}>
                <ComboboxList >
                  {status === "OK" &&
                    data.map(({ id, description }) => (
                      <ComboboxOption key={id} value={description} />
                    ))}
                </ComboboxList>
              </ComboboxPopover>
            </Combobox>
          </div> 
      // </Container>          
        
             
      );
}

export default Search;