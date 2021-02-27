import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TreePlanterGrid from "./treePlanterGrid"

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
    
    
  },
  
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    overflow: "auto",
    maxWidth:750,
    maxHeight: "70%"
    
   
  },
}));

export default function CheckoutModal(props) {
  const classes = useStyles();
  const[open, setOpen] = React.useState(false);
  const[treeData, setTreeData] = React.useState({});

  React.useEffect(async () => {

    const abortController = new AbortController()

    const data = await axios.get('http://localhost:3001/projects', {signal: abortController.signal})
    console.log(data)
    setTreeData(data);
    setOpen(true);


    return  () => abortController.abort()

      
  },[])

  return (
    <div style={{display:"flex", alignItems:'center',justifyContent:'center'}}>
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
            {(!open) ? <></> : <TreePlanterGrid treeData={treeData}></TreePlanterGrid>}
          </div>
        </Fade>
      </Modal>
    </div>

  );
}