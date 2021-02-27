import React from 'react'
import TreeCard from './treeCard'
import Grid from "@material-ui/core/Grid"
import uuid from 'react-uuid';


function TreePlanterGrid(props) {

    const data = props.treeData.data
  

    
   return (
       
       <Grid container spacing={7} style={{display:"flex", alignItems:'center',justifyContent:'center'}}>
           {data.map((treeProject) =>
           <Grid item key={uuid()} xs={12} s = {6} md={5}>
                 <TreeCard treeProject={treeProject} ></TreeCard> 
           </Grid> )}
        </Grid>
    // <TreeCard treeProject={data[0]} ></TreeCard> 
   )
    
}

export default TreePlanterGrid
