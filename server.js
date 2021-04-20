const express = require('express')
const app = express()
var cors = require('cors')
const path = require('path')
const axios = require('axios').default;
//xml parser
var parseString = require('xml2js').parseString;
//bodyParse
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())

const domain =  "http://localhost:3001";

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3001;


if(ENV == 'production') {
  app.use(express.static(path.join(__dirname, '/build')))
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'))
  })
}

 
// app.get('/', function (req, res) {
//   res.send({data : 'Hello World'})
// })

app.post('/getVehicleMPG', async(req, res) => {
    const make = req.body.make
    const model = req.body.model
    const year = req.body.year

    if(make === null || model === null || year === null){
      //check for empty parameters
      res.status(400).send({error: "Must Provide All Car Information Fields For Accurate Calculations"})
      return
    }

    var config = {
        headers: {'Accept': 'application/xml'}
   };


    var response = await axios.get('https://www.fueleconomy.gov/ws/rest/ympg/shared/vehicles?make='+ make + '&model=' + model, config)


    
    parseString(response.data.toString(), function (err, result) {
        response = result;
    });


    if(response.vehicles === ''){
      res.status(400).send({error: "invalid Make or Model"})
      return
    }

    var vehicleID = null;

    for(let i=0; i<response.vehicles.vehicle.length; i++){
        const vehicleObject = response.vehicles.vehicle[i]
        if(vehicleObject.year.toString() === year){

          vehicleID = vehicleObject.id
          
          break;

        }
    }


    if(vehicleID === null){
      //either api dosent contain data for vehicle made that year or invalid year
      res.status(400).send({error: "invalid Year"})
      return;
    }


    var mpgResponse = await axios.get("https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/"+vehicleID, config);

    parseString(mpgResponse.data.toString(), function (err, result) {
      mpgResponse = result;
    });

    const result = {"mpg" :mpgResponse.yourMpgVehicle.avgMpg[0]};

    res.send(result);


})

//view tree projects
app.get('/projects', async(req, res) =>{

    const response = await axios.get('https://api.digitalhumani.com/project', {headers: {"x-api-key":"BJHvUlBIsPL8Gbkl3OF93XQxzIHlU7d3HlR58pUi"} });

    console.log("--------------------------------------------------------")
    // console.log(response.length);

    res.send(response.data)


})



//tripToCarbon API

app.post("/getEmissions", async (req, res) => {
  let result = null
  

  if(req.body.type === 1){
    const gallonsUsed = req.body.gallonsUsed.toString()
    const fuelType = req.body.fuelType
    const url = 'https://api.triptocarbon.xyz/v1/footprint?activity='+gallonsUsed+'&activityType=fuel&country=usa&fuelType='+fuelType;
  
    let carbonFootprint = null

    try {
      carbonFootprint =  await axios.get(url)
      result = carbonFootprint.data.carbonFootprint
    } catch(error) {
      result = null
    }
    
    

  }
  else if(req.body.type === 2){    
    const distance = req.body.distanceInMiles
    const mode = req.body.mode 

    const url = 'https://api.triptocarbon.xyz/v1/footprint?activity='+distance+'&activityType=miles&country=def&mode='+mode;

    let carbonFootprint = null;

    try {
      carbonFootprint  = await axios.get(url)
      result = carbonFootprint.data.carbonFootprint

    } catch (error) {
      result = null
      
    }
   
      

  }

  res.send(result)

})



//start server 
app.listen(PORT, () => {
    console.log("server started at port 3001")
})