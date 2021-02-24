import React from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DistanceMatrixService } from "@react-google-maps/api";

const libraries = ["places"];

export default function useApp() {

    const [drawerToggle, setDrawerToggle] = React.useState(true);


    const [startPoint, setStartPoint] = React.useState({ address: null, latlng: null })

    const [destination, setDestination] = React.useState({ address: null, latlng: null })


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


    }

}