const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(json());
app.use(cors());

//1563921050

// 1564621050

app.get("/api/flights", async (req, res, next) => {
    const {type, icao, beginTime, endTime} = req.query;
    const url = `https://opensky-network.org/api/flights/${type}?airport=${icao}&begin=${beginTime}&end=${endTime}`
    try {
     const response = await axios.get(url);
     res.send({data: response.data})
    }catch(e) {
        res.send({ error: "no results"})
        console.log('error', e);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening @ port: ${port}`);
});
