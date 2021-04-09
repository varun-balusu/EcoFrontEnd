import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    maxWidth: 360,
    maxHeight: "100%"
  },
  media: {
    height: 140,
  },
});

const formatNames = (description, companyName, location) => {
    if(description === 'Khasi Hills in India, WeForest'){
      return <div>Khasi Hills in India, <br></br>  {companyName}</div>
    }
    if(description === 'Seret in Ethiopia, WeForest'){
      return <div>Secret in Ethiopia, <br></br>  {companyName}</div>
    }
    if(companyName === 'Conserve Natural Forests'){
      return <div>{location}, <br></br>  {companyName}</div>
    }
    if(companyName === 'Sustainable Harvest International'){
      return <div>{location}, <br></br> Sustainable Harvest </div>
    }
    if(companyName === 'ChaseAfrica'){
      return <div>{location}, <br></br> {companyName} </div>
    }
    if(companyName === 'OneTreePlanted'){
        return <div>{location}, <br></br>  {companyName}</div>
    }
    if(companyName === 'TIST'){
      return <div>{location}, <br></br>  {companyName}</div>
    }
    if(companyName === 'WeForest'){
      return <div>{location}, <br></br>  {companyName}</div>
    }
    
    else return description
}



export default function TreeCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const src = props.treeProject.reforestationProjectImageURL_en;
  let description = props.treeProject.description;
  let companyName = props.treeProject.reforestationCompanyName_en
  let location = (typeof props.treeProject.reforestationProjectState_en !== 'undefined') ? props.treeProject.reforestationProjectState_en : props.treeProject.reforestationProjectCountry_en
  const projectWebsite = props.treeProject.reforestationProjectWebsite_en
  // if(description === "India TIST"){
  //   description = <div>India, <br></br> TIST</div>
  // }
  // if(description === "Ethiopia OneTreePlanted"){
  //   description = <div>Ethiopia, <br></br> OneTreePlanted</div>
  // }
  description = formatNames(description, companyName, location)
  
  console.log(description)

  const handleClick = () => {
    window.open(projectWebsite, "_blank")
  }


  return (
    <div>
    
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image= {src}
          title=""
        />
        <CardContent>
          <Typography gutterBottom style={{fontSize: "1.6em"}} variant="h5" component="h2">
            {description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={handleClick}>
          Learn More
        </Button>
      </CardActions>
    </Card>
      
    </div>
  );
}
