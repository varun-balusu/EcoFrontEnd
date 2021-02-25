import TextField from '@material-ui/core/TextField';
import React from "react";
import uuid from 'react-uuid';

import useSearch from "./useSearch"

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


function Search(props) {


  const placeholder = props.placeholder


  const {cachedValue,
    displayError } = useSearch(props)


  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.653225, lng: () => -79.383186 },
      radius: 200 * 1000
    },

  });

  const handleSelect = async (address) => {
    console.log(address)

    setValue(address, false);

    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0])
      console.log( {lat, lng})

      if (props.searchNumber == 1) {
        props.setStartPoint(address, { lat, lng })
        props.isStartPointValid(true);

      }
      else if (props.searchNumber == 2) {
        props.setDestination(address, { lat, lng })
        props.isDestinationValid(true)
      }

      props.changeMarker({ lat, lng }, props.searchNumber)
    }
    catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (cachedValue !== null) {
      setValue(cachedValue)
    }
  }, [])

  return (

    // <Container style={{height:"100vh", width:"25vw", float:'left',padding:0, margin:0, backgroundColor:'#f9fbe7'}}>
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            console.log(e.target.value)
          }}
          disabled={!ready}

          placeholder={placeholder}

          style={{ borderColor: displayError ? "#f44336" : 'green', borderStyle: "solid" }}
        />

        <ComboboxPopover portal={false}>
          <ComboboxList >
            {(status === "OK" && value !== cachedValue) &&
              data.map(({ id, description }) => (
                <ComboboxOption key={uuid()} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
        {(displayError) ? <p style={{
          color: "#f44336", margin: 0, fontSize: "0.75rem", marginTop: "3px", textAlign: "left", fontFamily: " 'Roboto', 'Helvetica', 'Arial', sans-serif",
          fontWeight: "400", lineHeight: "1.66", letterSpacing: "0.03333em", marginLeft: "2px"
        }}>{props.errorMessage}</p> : <p></p>}
      </Combobox>
    </div>
    // </Container>          


  );
}

export default Search;