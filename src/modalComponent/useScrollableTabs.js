import React from 'react'

function useScrollableTabs(props) {
    const[Asia, setAsia] = React.useState([]);
    const[Africa, setAfrica] = React.useState([]);
    const[oceania, setOceania] = React.useState([]);
    const[europe, setEurope] = React.useState([]);
    const[carribean, setCarribean] = React.useState([]);
    const[centralAmerica, setCentralAmerica] = React.useState([]);
    const[southAmerica, setSouthAmerica] = React.useState([]);
    const[northAmerica, setNorthAmerica] = React.useState([]);

    const populateLocationArrays = (objectArray) => {
        console.log("inside")

        const regions =  ['asia', 'africa', 'oceania', 'europe', 'carribean', 'centralAmerica', 'southAmerica', 'northAmerica']
        let setters = [setAsia, setAfrica, setOceania, setEurope, setCarribean, setCentralAmerica, setSouthAmerica, setNorthAmerica]
        let projectsByRegion = new Map()

        for(let i=0; i<regions.length; i++){
            projectsByRegion.set(regions[i], [])
        } 
        
        
        for(let i=0; i<objectArray.length; i++){
            const country = objectArray[i].reforestationProjectCountry_en
            if(country.match(/^(India|Indonesia|Thailand|Vietnam|Philippines)$/)){
                projectsByRegion.set('asia', [...projectsByRegion.get('asia'), objectArray[i]])
            }
            else if(country.match(/^(Ethiopia|Tanzania|Rwanda|Kenya|Tanzania|Zambia|Uganda|Ghana)$/)){
                projectsByRegion.set('africa', [...projectsByRegion.get('africa'), objectArray[i]])
            }
            else if(country.match(/^(Guatemala|Honduras|Belize)$/)){
                projectsByRegion.set('centralAmerica', [...projectsByRegion.get('centralAmerica'), objectArray[i]])
            }
            else if(country.match(/^(Brazil|Colombia|Peru)$/)){
                projectsByRegion.set('southAmerica', [...projectsByRegion.get('southAmerica'), objectArray[i]])
            }
            else if(country.match(/^(Canada|United States|Mexico)$/)){
                projectsByRegion.set('northAmerica', [...projectsByRegion.get('northAmerica'), objectArray[i]])
            } 
            else if(country.match(/^(Australia|New Zealand)$/)){
                projectsByRegion.set('oceania', [...projectsByRegion.get('oceania'), objectArray[i]])
            }
            else if(country.match(/^(Spain|Iceland|Denmark|Romania|Scotland)$/)){
                projectsByRegion.set('europe', [...projectsByRegion.get('europe'), objectArray[i]])
            }
            else if(country.match(/^(Haiti)$/)){
                projectsByRegion.set('carribean', [...projectsByRegion.get('carribean'), objectArray[i]])
            }
        }
        
        for(let i=0; i<setters.length; i++){
            const regionsProjects = projectsByRegion.get(regions[i])
            const currentSetterFunction = setters[i]
            currentSetterFunction(regionsProjects)
        }
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return {
        populateLocationArrays,
        Asia,
        Africa,
        oceania,
        europe,
        carribean,
        centralAmerica,
        southAmerica,
        northAmerica,
        value,
        handleChange
    }

}

export default useScrollableTabs