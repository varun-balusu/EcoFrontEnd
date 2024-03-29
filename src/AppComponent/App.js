import './App.css';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DistanceMatrixService } from "@react-google-maps/api";
import React from "react";
import mapStyles from "../mapStyles";
import Container from '@material-ui/core/Container';
import { AppBar } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Search from "../SearchComponent/search";
import StepContent from "../SidePanelComponent/stepContent"
import SidePanel from "../SidePanelComponent/sidePanel"
import CheckoutModal from "../modalComponent/modal"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import useApp from "./useApp"

const mapContainerStyle = {
  width: "100vw",
  height: "92.5vh",
  // float: "right",
  // border: "inset"
};

const center = {
  lat: 37.733795,
  lng: -122.446747
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    width: 305,
    overflow: "hidden",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  alertContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: '10000',
    display: 'flex',
    justifyContent: 'center',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }, 
}));

function App() {

  const classes = useStyles();


  const { handleStartSelect,
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
    handleChangeMode,
    modeError,
    toggleModeError,
    updateCarModeInfo,
    setMatrixServiceMode,
    loadMatrixSerivce,
    toggleLoadMatrixService,
    setMatrixTransitOptions,
    updateMatrixServiceResponse,
    openModal,
    toggleModal,
    carbonFootprint,
    openLoadingCircle,
    openAlert,
    alertMessage,
    alertMode,
    triggerLinkCopiedConfirmation } = useApp();

  if (loadError) {
    return "error";
  }

  return isLoaded ? (
    <Router>
      <Switch>
        <Route path="/" exact>
        <div>
          <div>
            {(openAlert) ? <div class={classes.alertContainer}>
                  <Alert severity={alertMode} style={{width:"55%"}}>
                    {alertMessage}
                  </Alert>
            </div> : <></>}
            <AppBar position="static" style={{ backgroundColor: "#607d8b", position: "relative", zIndex: "1400" }}>
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <img className="leafIcon" src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTM2Mi40MTEgMzM0LjIxOWMuMDUyLTQuMDUtMS41MzMtOC4yNzItNC4zOTItMTEuMTMxbC02LjA5LTYuMDkxIDI3LjQyOC0yMS4yMTMgMzEuMzg3LTguNzg0YzExNi42NzgtMTQzLjkzIDEwMC45MTctMjY3LjcwMyAxMDAuMTI5LTI3My4xNjUtLjQ2Ni0zLjMwNC0xLjk5NC02LjI1MS00LjIzMS04LjQ4OHMtNS4xODQtMy43NjUtOC40ODgtNC4yMzFjLTIuODU5LS40MTQtNzAuOTIxLTkuNDk4LTE2NC40NzUgMzIuMTYyLTQuMjE2IDEuODc1LTcuMzMzIDUuNTkzLTguNDUyIDEwLjA2OGwtNy4wMzMgMjguMTIyLTEyLjE3MS0xMi4xNzFjLTQuODM3LTQuODM3LTEyLjMyNi01Ljc4LTE4LjIwOS0yLjMyLTM4LjI3MyAyMi41MjktNzUuMjcyIDUxLjU1Mi0xMDkuOTgxIDg2LjI2MXMtNjMuNzMzIDcxLjcwOS04Ni4yNjIgMTA5Ljk4MWMtMy40NiA1Ljg4My0yLjUxNyAxMy4zNzIgMi4zMiAxOC4yMDlsMTIuMTcxIDEyLjE3MS0yOC4xMjIgNy4wMzNjLTQuNDc1IDEuMTE5LTguMTkzIDQuMjM2LTEwLjA2OCA4LjQ1Mi00MS42NjEgOTMuNTU0LTMyLjU3NyAxNjEuNjE2LTMyLjE2MyAxNjQuNDc1LjQ2NiAzLjMwNCAxLjk5OSA2LjI0NiA0LjIzNiA4LjQ4M3M1LjE3OSAzLjc3IDguNDgzIDQuMjM2YzYuMDkxLjg3IDE1MC44OTUgMTkuNTc3IDMwOS4zMzItMTMxLjM4MSAyLjkyMi0yLjc5NiA0LjYtNi42NDkgNC42NTEtMTAuNjc4eiIgZmlsbD0iIzk3ZGUzZCIvPjxwYXRoIGQ9Im0zNTcuNzYxIDM0NC44OThjMi45MjEtMi43OTcgNC41OTktNi42NSA0LjY1MS0xMC42NzkuMDUyLTQuMDUtMS41MzMtOC4yNzItNC4zOTItMTEuMTMxbC02LjA5LTYuMDkxIDI3LjQyOC0yMS4yMTMgMzEuMzg2LTguNzg0YzExNi42NzgtMTQzLjkzIDEwMC45MTctMjY3LjcwMyAxMDAuMTI5LTI3My4xNjUtLjQ2Ni0zLjMwNC0xLjk5NC02LjI1MS00LjIzMS04LjQ4OGwtNDY2LjY5NiA0NjYuNjk1YzIuMjM3IDIuMjM3IDUuMTc5IDMuNzcgOC40ODMgNC4yMzYgNi4wOTEuODcxIDE1MC44OTYgMTkuNTc3IDMwOS4zMzItMTMxLjM4eiIgZmlsbD0iIzU5YzM2YSIvPjxnPjxwYXRoIGQ9Im0zOTIuMzQ2IDMwOC44OTdjNi41ODYtNy4zNTUgMTIuNTA3LTE0LjYzMSAxOC4zOTgtMjEuODk3aC0xMTYuMjRjLTguMjg2IDAtMTQuOTk4IDYuNzEyLTE0Ljk5OCAxNC45OThzNi43MTIgMTQuOTk4IDE0Ljk5OCAxNC45OThoNTcuNDI1IDYuNzc4YzguNjQxLjAwMSAyNy44MjMtMS41NTYgMzMuNjM5LTguMDk5eiIgZmlsbD0iIzAwYTY2YyIvPjwvZz48Zz48cGF0aCBkPSJtMjIwLjI1OCAzNjJoLTQ4LjY0MWwxNjAuOTIyLTE2MS4wMDNoNzguNjM4YzguMjg2IDAgMTQuOTk4LTYuNzEyIDE0Ljk5OC0xNC45OThzLTYuNzEyLTE0Ljk5OS0xNC45OTgtMTQuOTk5aC00OC42NDFsNTkuMjQ4LTU5LjU4MmM1Ljg2My01Ljg2MyA1Ljg2My0xNS4zNTEgMC0yMS4yMTNzLTE1LjM1MS01Ljg2My0yMS4yMTMgMGwtNTguNTc0IDU5LjI0OHYtNDguNjQxYzAtOC4yODYtNi43MTItMTQuOTk4LTE0Ljk5OC0xNC45OThzLTE0Ljk5OCA2LjcxMi0xNC45OTggMTQuOTk4djc4LjYzOGwtNzYuMDAzIDc2LjA2OXYtNDguNjQxYzAtOC4yODYtNi43MTItMTQuOTk4LTE0Ljk5OC0xNC45OThzLTE1IDYuNzExLTE1IDE0Ljk5N3Y3OC42MzhsLTIwMS42MDMgMjAwLjg3NWMtNS44NjMgNS44NjMtNS44NjMgMTUuMzUxIDAgMjEuMjEzIDUuODYzIDUuODYzIDE1LjM1MSA1Ljg2MyAyMS4yMTMgMGwxMTYuMDEtMTE1LjYwNmg3OC42MzhjOC4yODYgMCAxNC45OTgtNi43MTIgMTQuOTk4LTE0Ljk5OCAwLTguMjg3LTYuNzEyLTE0Ljk5OS0xNC45OTgtMTQuOTk5eiIgZmlsbD0iIzU5YzM2YSIvPjxwYXRoIGQ9Im0yNS42MSA1MDcuNjAzIDExNi4wMS0xMTUuNjA2aDc4LjYzOGM4LjI4NiAwIDE0Ljk5OC02LjcxMiAxNC45OTgtMTQuOTk4cy02LjcxMi0xNC45OTgtMTQuOTk4LTE0Ljk5OGgtNDguNjQxbDE2MC45MjItMTYxLjAwM2g3OC42MzhjOC4yODYgMCAxNC45OTgtNi43MTIgMTQuOTk4LTE0Ljk5OHMtNi43MTItMTUtMTQuOTk4LTE1aC00OC42NDFsNTkuMjQ4LTU5LjU4MmM1Ljg2My01Ljg2MyA1Ljg2My0xNS4zNTEgMC0yMS4yMTNsLTQxNy4zODcgNDE3LjM5OGM1Ljg2MyA1Ljg2MyAxNS4zNTEgNS44NjMgMjEuMjEzIDB6IiBmaWxsPSIjMDBhNjZjIi8+PC9nPjwvZz48L3N2Zz4=" />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  EcoWise
            </Typography>
              </Toolbar>
            </AppBar>
          </div>
         
          <div>
            <MenuIcon onClick={toggleDrawer(true)} style={{ position: 'absolute', left: "0.5em", paddingTop: "0.5em", zIndex: "10", fontSize: "2em", cursor: "pointer" }}></MenuIcon>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={6}
              center={center}
              options={options}
              onLoad={onMapLoad}>
              {markers.map((marker) =>
                <Marker
                  key={marker.lat, marker.lng}
                  position={{ lat: marker.lat, lng: marker.lng }}>
                </Marker>
              )}

            </GoogleMap>

          </div>


          <SidePanel
            drawerToggle={drawerToggle}
            toggleDrawer={toggleDrawer}
            panTo={panTo}
            setMarkers={handleMarkerUpdatesFromSearch}
            setStartPoint={handleStartSelect}
            setDestination={handleDestinationSelect}
            savedStartValue={startPoint}
            savedDestinationValue={destination}
            mode={mode}
            modeError={modeError}
            updateMode={handleChangeMode}
            toggleModeError={toggleModeError}
            updateCarModeInfo={updateCarModeInfo}
            toggleLoadMatrixService={toggleLoadMatrixService}
          ></SidePanel>



          <Backdrop className={classes.backdrop} open={openLoadingCircle}>
            <CircularProgress color="inherit" />
          </Backdrop>

          {openModal ? 
            <CheckoutModal 
              carbonFootprint={carbonFootprint} 
              mode={mode} destination={destination} 
              startingPoint={startPoint} 
              openModal={openModal} 
              toggleModal={toggleModal} 
              triggerLinkCopiedConfirmation={triggerLinkCopiedConfirmation}>

            </CheckoutModal> : <></>}


          {loadMatrixSerivce ? <DistanceMatrixService
            options={{
              destinations: [destination.latlng],
              origins: [startPoint.latlng],
              travelMode: setMatrixServiceMode(),
              transitOptions: { modes: setMatrixTransitOptions() }
            }}
            callback={(response) => {
              console.log(response)
              updateMatrixServiceResponse(response)
              toggleLoadMatrixService(false)

            }}
          /> : <></>}

        </div>
        </Route>
      </Switch>
      <Switch>
        <Route path="/modal" exact render={() => <CheckoutModal openModal={openModal}  toggleModal={toggleModal}></CheckoutModal>} ></Route>
      </Switch>

    </Router>

  ) : <></>
}

export default App;
