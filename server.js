const express = require('express')
const app = express()

const axios = require('axios').default;
//stripe
const stripe = require('stripe')('sk_test_51IMiHRBLUZqoaNZQUqyKCBTp0RhkLWQuS5epsUOx6hV4y5ERxyjkBTGklwKPXIRId9il0USn3poNAm7rdGU4bIAW005qXmu195');
//xml parser
var parseString = require('xml2js').parseString;
//bodyParse
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const domain =  "http://localhost:3001";


 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/getVehicleMPG', async(req, res) => {
    const make = req.body.make
    const model = req.body.model
    const year = req.body.year

    var config = {
        headers: {'Accept': 'application/xml'}
   };


    var response = await axios.get('https://www.fueleconomy.gov/ws/rest/ympg/shared/vehicles?make='+ make + '&model=' + model, config)

    
    parseString(response.data.toString(), function (err, result) {
        response = result;
    });

    var vehicleID = null;

    for(let i=0; i<response.vehicles.vehicle.length; i++){
        const vehicleObject = response.vehicles.vehicle[i]

        if(vehicleObject.year == year){

          vehicleID = vehicleObject.id
          break;

        }
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

    console.log(response);


})

//stripe payment route
app.post('/pay', async (req, res) => {

    const session = await stripe.checkout.sessions.create({

        payment_method_types: ['card'],
        line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Tree Conservation',
                },
                unit_amount: 100,
              },
              quantity: 8,
            },
          ],
        mode: 'payment',
        success_url: `${domain}?success=true`,
        cancel_url: `${domain}?canceled=true`,

    })
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true 
        });
        res.json({ id: session.id });
})

//tripToCarbon API

app.get("/carbonize", async (req, res) => {

  const axios = require("axios");
  axios.get('https://api.triptocarbon.xyz/v1/footprint?activity=10&activityType=miles&country=usa&mode=taxi')
  .then(function (response) { console.log(response.data); })
  .catch(function (error) { console.log(error); });

})



//start server 
app.listen(3001, () => {
    console.log("server started at port 3001")
})