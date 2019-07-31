const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(json());
app.use(cors());

app.get("/api/flights", async (req, res, next) => {
    const {type, icao, beginTime, endTime} = req.query;
    try {
     const response = await axios.get(`https://likono:getMeAirports@opensky-network.org/api/flights/${type}?airport=${icao}&begin=${beginTime}&end=${endTime}`);
     console.log(response.data);
    }catch(e) {
        console.log(e);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening @ port: ${port}`);
});
