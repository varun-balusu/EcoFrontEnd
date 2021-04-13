import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TreePlanterGrid from "./treePlanterGrid"

import useScrollableTabs from "./useScrollableTabs"

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
                    <Typography component={'span'}>{children}</Typography>
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
    
    const { 
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
        handleChange } = useScrollableTabs()

    
    
    React.useEffect(() => {
        populateLocationArrays(props.treeData.data)
    },[])
        
    
    



    const classes = useStyles();
    

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
                <TreePlanterGrid treeData={Asia} triggerLinkCopiedConfirmation={props.triggerLinkCopiedConfirmation}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={1}>
            <TreePlanterGrid treeData={Africa} triggerLinkCopiedConfirmation={props.triggerLinkCopiedConfirmation}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={2}>
            <TreePlanterGrid treeData={oceania} triggerLinkCopiedConfirmation={props.triggerLinkCopiedConfirmation}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={3}>
            <TreePlanterGrid treeData={europe} triggerLinkCopiedConfirmation={props.triggerLinkCopiedConfirmation}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={4}>
            <TreePlanterGrid treeData={carribean} triggerLinkCopiedConfirmation={props.triggerLinkCopiedConfirmation}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={5}>

            <TreePlanterGrid treeData={centralAmerica} triggerLinkCopiedConfirmation={props.triggerLinkCopiedConfirmation}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={6}>

            <TreePlanterGrid treeData={southAmerica} triggerLinkCopiedConfirmation={props.triggerLinkCopiedConfirmation}></TreePlanterGrid>

            </TabPanel>
            <TabPanel value={value} index={7}>

            <TreePlanterGrid treeData={northAmerica} triggerLinkCopiedConfirmation={props.triggerLinkCopiedConfirmation}></TreePlanterGrid>

            </TabPanel>
        </div>
    );
}