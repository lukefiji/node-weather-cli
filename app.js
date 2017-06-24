const request = require("request");

// Make a request
request(
  {
    url:
      "https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20st%20philadelphia",
    json: true
  },
  (error, response, body) => {
    console.log(body);
  }
);
