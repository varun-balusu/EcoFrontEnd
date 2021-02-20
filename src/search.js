import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 }
]

function Search( props){

    // console.log(props)
  
  
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
      requestOptions: {
        location: {lat: () =>  43.653225, lng: () => -79.383186},
        radius: 200 * 1000
      },
  
    });
  
    const handleSelect = async (address) => {
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
              }}
              disabled={!ready}
              placeholder="Starting Location"
            />
            <ComboboxPopover>
              <ComboboxList>
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