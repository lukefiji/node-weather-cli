require("dotenv").config();

const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

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

// First argument of callback: errors
// Second argument of callback: results
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);

    // Lat, Lng, Callback
    weather.getWeather(results.lat, results.lng, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(
          `It's currently ${results.temp} but it feels like it's ${results.apparentTemp}`
        );
      }
    });
  }
});
