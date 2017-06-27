require("dotenv").config();

const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true // Always parse as a string
    }
  })
  .help()
  .alias("help", "h").argv;

// Encode address
const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios
  .get(geocodeUrl)
  .then(response => {
    // If no results found
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("Unable to find that address.");
    }

    // Formatting data
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    const API_KEY = process.env.API_KEY;
    const weatherUrl = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;

    console.log("Address:", response.data.results[0].formatted_address);

    // Making request from weather API /w data from geolocator
    return axios.get(weatherUrl);
  })
  .then(response => {
    // Formatting weather API data
    const temp = response.data.currently.temperature;
    const apparentTemp = response.data.currently.apparentTemperature;

    // Logging the temperature
    console.log(
      `It's currently ${temp} but it feels like it's ${apparentTemp}`
    );
  })
  .catch(err => {
    if (err.code === "ENOTFOUND") {
      console.log("Unable to connect to API servers.");
    } else {
      console.log(err);
    }
  });
