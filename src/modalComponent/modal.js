import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TreePlanterGrid from "./treePlanterGrid"
import ScrollableTabs from "./tabPanel"
import Box from '@material-ui/core/Box';
import { Hidden, Container } from '@material-ui/core';
import modalImage from "./modalBackground.jpg";
import Button from '@material-ui/core/Button';
import { green, lightGreen, purple } from '@material-ui/core/colors';

const axios = require('axios').default;


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "&:focus": {
      outline: "none"
    },
    overflow: "auto",
    left: '50%',
    top: '50%',
    // backgroundImage:"url(../modalBackGround.jpg)" 

  },

  paper: {
    // backgroundColor: 'red',
    // backgroundImage: `url(${modalImage})`,
    // backgroundSize: 'cover',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    overflow: "auto",
    maxWidth: 750,
    maxHeight: "70%",


  },
  tripInfo: {
    ...theme.typography.button,
    padding: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },

}));

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#66bb6a',
    },
  },
});

export default function CheckoutModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [treeData, setTreeData] = React.useState({});

  React.useEffect(async () => {

    const abortController = new AbortController()

    const data = await axios.get('http://localhost:3001/projects', { signal: abortController.signal })
    console.log(data)
    setTreeData(data);
    


    return () => abortController.abort()


  }, [])

  return (
    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center'}}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openModal}
        onClose={() => props.toggleModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.openModal}>
          <div className={classes.paper}>
            {(!open) ? <div>
              <div style={{ display: 'flex', justifyContent: 'center', margin: 0, height: "5vh", position: 'relative' }}>
                <p className={classes.tripInfo}>Your Trip</p>
              </div>


              <div style={{ display: 'flex', justifyContent: 'center' }}>

                <p className={classes.tripInfo}>from:</p>
                <p style={{ color: "gray", textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className={classes.tripInfo}>{props.startingPoint.address}</p>

                <p className={classes.tripInfo}>to:</p>

                <p style={{ float: 'right', color: "gray", textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className={classes.tripInfo}>{props.destination.address}</p>

                <p className={classes.tripInfo}>via:</p>

                <p style={{ color: "gray" }} className={classes.tripInfo}>Motorcycle</p>

              </div>


              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p className={classes.tripInfo}>Emissions:</p>
                <p className={classes.tripInfo} style={{ color: "gray" }}>{props.carbonFootprint}Kg</p>
              </div>

              <hr></hr>

              <Container style={{ display: 'flex', flexDirection: "column",  alignItems: "center"}}>
                <p style={{marginBottom: 0}}>Consider offseting your emissions.</p>
                <p style={{marginBottom: 0}}>By clicking below you can find trusted orginizations that can plant trees on your behalf.</p>
                <p >Each tree can absorb 22kg (50 pounds) of CO2 per year for 30 years.</p>
                <ThemeProvider theme={theme}>
                  <Button variant="contained" color="secondary" onClick={setOpen}>Offset</Button>
                </ThemeProvider>
                
              </Container>

              

            </div> : <></>}

            


            {(!open) ? <></> : <ScrollableTabs treeData={treeData} open={props.openModal}></ScrollableTabs>}
          </div>
        </Fade>
      </Modal>
    </div>

  );
}