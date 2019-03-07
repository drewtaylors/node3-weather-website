const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/685a79607d7b4974333837e7cd1080be/' + latitude + ',' + longitude

    request ({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else { 
            const temperature = body.currently.temperature
            const rainChance = body.currently.precipProbability * 100
            const highTemperature = body.daily.data[0].temperatureHigh
            const lowTemperature = body.daily.data[0].temperatureLow

            let forecast = body.daily.data[0].summary
            forecast += ' It is currently ' + temperature + ' degrees out.'
            forecast += ' The high today is ' + highTemperature + ' degrees with a low of ' + lowTemperature + ' degrees.'
            forecast += ' There is a ' + rainChance + '% chance of rain.'

            callback(undefined, forecast)
        }
    })
}

module.exports = forecast