import React from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DistanceMatrixService } from "@react-google-maps/api";

const axios = require('axios').default;

const libraries = ["places"];

export default function useApp() {

    const [drawerToggle, setDrawerToggle] = React.useState(true);

    const [startPoint, setStartPoint] = React.useState({ address: null, latlng: null })

    const [destination, setDestination] = React.useState({ address: null, latlng: null })

    const [mode, setMode] = React.useState("")

    const [modeError, setModeError] = React.useState(false)

    const [carModeInfo, setCarModeInfo] = React.useState({ make: null, model: null, year: null })

    const [loadMatrixSerivce, setLoadMatrixService] = React.useState(false);

    const [matrixServiceResponse, setMatrixServiceResponse] = React.useState({});


    const updateMatrixServiceResponse = (response) => {
        setMatrixServiceResponse(response);
        //this is the callback function is which the rest of the api calls may be called
        console.log(isStatusOk(response));
    }


    const toggleLoadMatrixService = (flag) => {
        setLoadMatrixService(flag);
    }

    const isStatusOk = (response) => {
        if(response === {}){
            return
        }
        const data = response.rows[0].elements[0]
        const status = data.status

        if (status === 'OK') {
            return true
        }
        else {
            return false
        }

    }

    // const calculateCarbonEmissions = async (response) => {

    //     if (!isStatusOk(response)) {
    //         //error google matrix service response status is not OK
    //         return;
    //     }

    //     const hello = await axios.get("http://localhost:3001/")


    //     console.log("hello");

    // }

   

    const setMatrixTransitOptions = () => {
        if (mode === 'Car' || mode === 'Motorcycle') {
            return [];
        }
        else if (mode === 'Bus') {
            return ['BUS'];
        }
        else if (mode === 'Transit-Rail') {
            return ['RAIL'];
        }
    }


    const setMatrixServiceMode = () => {
        if (mode === 'Car' || mode === 'Motorcycle') {
            return 'DRIVING';
        }
        else if (mode === 'Bus' || mode === 'Transit-Rail') {
            return 'TRANSIT'
        }
    }


    function updateCarModeInfo(option, type) {
        if (type === 1) {
            setCarModeInfo({ ...carModeInfo, make: option })
        }
        else if (type === 2) {
            setCarModeInfo({ ...carModeInfo, model: option })
        }
        else if (type === 3) {
            setCarModeInfo({ ...carModeInfo, year: option })
        }
    }


    function handleChangeMode(option) {
        setMode(option.target.value)
    }

    React.useEffect(() => {
        if (mode !== "") {
            setModeError(false);
        }
    }, [mode])

    function toggleModeError(flag) {
        setModeError(flag);
    }


    const handleStartSelect = (option, latlng) => {

        setStartPoint({ address: option, latlng: latlng });
    }

    const handleDestinationSelect = (option, latlng) => {

        setDestination({ address: option, latlng: latlng });

    }

    const toggleDrawer = (open) => (event) => {

        setDrawerToggle(open)

    }




    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDXAlhX0Ay85xVyVITKedsYg7LlmZfYLuk",
        libraries: libraries
    })


    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const [markers, setMarkers] = React.useState([]);

    React.useEffect(() => {
        fitBounds();
    }, [markers])

    const fitBounds = () => {
        if (!mapRef.current) return;

        const bounds = new window.google.maps.LatLngBounds();
        markers.map(place => {
            bounds.extend(place);
        });
        mapRef.current.fitBounds(bounds);
        if (markers.length == 1) {
            mapRef.current.setZoom(6);
        }
    };

    const panTo = React.useCallback(({ lat, lng }) => {
        // mapRef.current.panTo({lat, lng});
        // console.log(markers.length)


        // mapRef.current.setZoom(6);

    }, []);

    function handleMarkerUpdatesFromSearch(marker, searchType) {
        let newMarkers = [...markers]
        if (searchType == 1) {
            newMarkers[0] = marker
        }
        else if (searchType == 2) {

            newMarkers[1] = marker

        }

        setMarkers(newMarkers)
    }

    return {
        handleStartSelect,
        handleDestinationSelect,
        toggleDrawer,
        drawerToggle,
        handleMarkerUpdatesFromSearch,
        onMapLoad,
        markers,
        panTo,
        startPoint,
        destination,
        isLoaded,
        loadError,
        mode,
        modeError,
        handleChangeMode,
        toggleModeError,
        updateCarModeInfo,
        setMatrixServiceMode,
        loadMatrixSerivce,
        toggleLoadMatrixService,
        setMatrixTransitOptions,
        updateMatrixServiceResponse


    }

}