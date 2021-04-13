import React from 'react'
const axios = require('axios').default;


function useEmissionsCalculator() {
    const calculateEmissions = async (response, mode, carModeInfo) => {
        if (typeof response === 'undefined') {
            return 
        }
        if (!isStatusOk(response)) {
            return new Error('Invalid response From Google Matrix API')
        }
        if(response.rows[0].elements[0].distance.value === 0){
            return 0
        }

        const distanceInMiles = response.rows[0].elements[0].distance.value / 1609

        

        let emissions = null;

        if (mode === 'Car') {
            const mpg = await getVehicleMPG(carModeInfo)
            //if mpg is null after this call then something went worn in fething the data if it was provided or none was given so it remains null

            if (mpg !== null) {
                const mpgAsFloat = parseFloat(mpg.data.mpg)

                const gallonsUsed = (1 / mpgAsFloat) * distanceInMiles

                emissions = await getEmissions(mode, null, gallonsUsed)

            }
            else {
                
                emissions = await getEmissions(mode, distanceInMiles, null)
                
                if (carModeInfo.make != null || carModeInfo.model != null || carModeInfo.year != null){
                    emissions.message = "Vehicle Not Found"
                }
                
                // console.log(emissions)
            }

        }

        if (mode !== 'Car') {

            emissions = await getEmissions(mode, distanceInMiles, null);

        }

        return emissions

    }


    const getEmissions = async (mode, distanceInMiles, gallonsUsed) => {
        let emissions = null;

        if (gallonsUsed !== null && distanceInMiles === null) {

            const body = { gallonsUsed: gallonsUsed, fuelType: 'motorGasoline', type: 1 }

            emissions = await axios.post("http://localhost:3001/getEmissions", body)

        }
        else {
            //generic case
            let transportationType = null;

            if (mode === 'Car') {
                transportationType = 'petrolCar'
            }
            else if (mode === 'Transit-Rail') {
                transportationType = 'transitRail'
            }
            else if (mode === 'Motorcycle') {
                transportationType = 'motorbike'
            }
            else if (mode === 'Bus') {
                transportationType = 'bus'
            }

            const body = { distanceInMiles: distanceInMiles.toString(), mode: transportationType, type: 2 }

            emissions = await axios.post("http://localhost:3001/getEmissions", body)

        }



        return emissions





    }


    const isStatusOk = (response) => {
        if (response === {}) {
            return false
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


    const getVehicleMPG = async (carModeInfo) => {
        let mpg = null;

        try {
            mpg = await axios.post("http://localhost:3001/getVehicleMPG", carModeInfo)
        } catch (error) {
            console.log(error)

        }
        return mpg
    }


    return {
        calculateEmissions
    }



}

export default useEmissionsCalculator
