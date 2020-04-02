const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieW9nZXNobWlzaHJhNjY3IiwiYSI6ImNrOGQwNXcxOTBxbnozbG9hZWhlcG80M2MifQ.3VBLeZI74qpVkITPKr5QTw&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    //(error, response)//using destructing method
    if (error) {
      callback("unable to connect geocoding service", undefined);
    } else if (body.features.length === 0) {
      callback(
        "unable to find location please try with another term",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place: body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;
