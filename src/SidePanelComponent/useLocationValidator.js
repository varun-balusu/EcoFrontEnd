import React from 'react'

export default function useLocationValidator() {

    const [validStartPointSelected, setvalidStartPointSelected] = React.useState(false);

    const [validDestinationPointSelected, setValidDestinationPointSelected] = React.useState(false);

    const [startDisplayError, setStartDisplayError] = React.useState(false);

    const [destinationDisplayError, setDestinationDisplayError] = React.useState(false);


    function isStartPointValid(flag) {
        setvalidStartPointSelected(true);
    }

    function isDestinationValid(flag) {
        setValidDestinationPointSelected(flag);
    }

    function toggleStartDisplayError(flag) {
        setStartDisplayError(flag);
    }

    function toggleDestinationDisplayError(flag) {
        setDestinationDisplayError(flag);
    }


    React.useEffect(() => {
        if (validStartPointSelected) {
            setStartDisplayError(false)
        }

    }, [validStartPointSelected])

    React.useEffect(() => {
        if (validDestinationPointSelected) {
            setDestinationDisplayError(false)
        }

    }, [validDestinationPointSelected])



    return {
        toggleStartDisplayError,
        toggleDestinationDisplayError,
        isStartPointValid,
        isDestinationValid,
        startDisplayError,
        destinationDisplayError,
        validStartPointSelected,
        validDestinationPointSelected

    }

}
