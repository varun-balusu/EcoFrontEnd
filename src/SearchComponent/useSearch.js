import React from 'react'

function useSearch(props) {
    function getCachedValue() {
        if (props.searchNumber == 1) {
            return props.savedStartValue.address
        }
        else {
            return props.savedDestinationValue.address
        }
    }

    function getErrorMessage() {
        if (props.searchNumber == 1) {
            return props.startDisplayError
        }
        else {
            return props.destinationDisplayError
        }
    }


    const cachedValue = getCachedValue()

    const displayError = getErrorMessage()


    return {
        cachedValue,
        displayError
    }
}

export default useSearch
