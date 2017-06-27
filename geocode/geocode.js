const request = require("request");

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  // Make a request from Google Geolocation
  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        // System errors on first argrument
        callback("Unable to connect to Google servers.");
      }
      if (body.status === "ZERO_RESULTS") {
        // Search errors on first argrument
        callback("Unable to find that address.");
      } else if (body.status === "OK") {
        // No errors, return in second argument
        callback(undefined, {
          address: body.results[0].formatted_address,
          lat: body.results[0].geometry.location.lat,
          lng: body.results[0].geometry.location.lng
        });
      }
    }
  );
};

module.exports = { geocodeAddress };
