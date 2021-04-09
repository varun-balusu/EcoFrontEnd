import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TreePlanterGrid from "./treePlanterGrid"

function TabPanel(props) {

    

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    
    },
}));






export default function ScrollableTabs(props) {
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
    
    React.useEffect(() => {
        populateLocationArrays(props.treeData.data)
    },[])
        
    
    



    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Asia" {...a11yProps(0)} />
                    <Tab label="Africa" {...a11yProps(1)} />
                    <Tab label="Oceania" {...a11yProps(5)} />
                    <Tab label="Europe" {...a11yProps(6)} />
                    <Tab label="Carribean" {...a11yProps(7)} />
                    <Tab label="Central America" {...a11yProps(2)} />
                    <Tab label="South America" {...a11yProps(3)} />
                    <Tab label="North America" {...a11yProps(4)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
             <div>
                <TreePlanterGrid treeData={Asia}></TreePlanterGrid>
                </div>

            </TabPanel>
            <TabPanel value={value} index={1}>
            <TreePlanterGrid treeData={Africa}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={2}>
            <TreePlanterGrid treeData={oceania}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={3}>
            <TreePlanterGrid treeData={europe}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={4}>
            <TreePlanterGrid treeData={carribean}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={5}>

            <TreePlanterGrid treeData={centralAmerica}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={6}>

            <TreePlanterGrid treeData={southAmerica}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={7}>

            <TreePlanterGrid treeData={northAmerica}></TreePlanterGrid>

            </TabPanel>
        </div>
    );
}