const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/b441c05801771daee6368f51a72ca9c7/${latitude},${longitude}?units=si `;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect weather service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} it's currently ${body.currently.temperature} degree out there is the ${body.currently.precipProbability}% chance of rain  the highest temperature is ${body.daily.data[0].temperatureHigh} and lowest temperature is
        ${body.daily.data[0].temperatureLow} and wind speed is ${body.daily.data[0].windSpeed} and ozone layer level is ${body.daily.data[0].ozone}`
      );
      
      // const body = response.body.currently;
      // console.log(
      //   `it's currently ${body.temperature} degree out there is the ${body.precipProbability}% chance of rain`
      // );
    }
    //console.log(response.body.timezone)
  });
};

module.exports = forecast;
