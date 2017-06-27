const request = require("request");

const API_KEY = process.env.API_KEY;

const getWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // Able to fetch weather
        return callback(undefined, {
          temp: body.currently.temperature,
          apparentTemp: body.currently.apparentTemperature
        });
      } else {
        // Unable to fetch weather
        return callback("Unable to fetch weather.");
      }
    }
  );
};

// module.exports.getWeather = getWeather
module.exports = { getWeather };
