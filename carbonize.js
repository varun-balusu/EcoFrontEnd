const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require('node-fetch');


app.listen(3001, () => {
    console.log("server running on port 3001");
});

app.get("/", async (req, res) => {

const response = await fetch("https://api.triptocarbon.xyz/v1/footprint?activity=10&activityType=miles&country=def&mode=taxi")
console.log(response)
res.send(response);

})