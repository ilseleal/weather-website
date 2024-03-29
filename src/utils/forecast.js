const request = require('request')

//-----------------------------------------------------------------------------
//request is deprecated. You can use the following alternative:
//https://www.npmjs.com/package/postman-request
//It works just as the origina request.
//
//request is a module that helps you make an HTTP request.
//Arguments: It takes an object and a function.
//- The object is where you specify the url and you can set the 'json'
//  property to true if you want the response automatically parsed to JSON.
//- The function can be a arrow function whose arguments are:
//      - error
//      - response
//      response.body is where you get your data from.
//----------------------------------------------------------------------------

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6b833666e5f131c0c91d69a25ccf9832&query=' + latitude + ', ' + longitude
    //Antes: 
    //=====
    //request({ url, json: true }, (error, response) => {

    //Después:
    //=======
    //Object destructuring: en lugar de recibir todo el 'response', 
    //especificamos que sólo queremos recibir la propiedad body del 
    //objeto response.
    // 
    //En el resto del código, hacemos referencia a body, que representa
    // a response.body. 
    //
    
    request({ url, json: true }, (error, {body}) => {
        if (error)
            callback('Could not reach weather service. Check your Internet connection.', undefined)
        else if (body.error)
            callback(response.body.error, undefined)
        else {
            const forecast_string = body.current.weather_descriptions[0] + 
            '. The temperature is ' + body.current.temperature + '°C' +
            ' and it feels like: ' + body.current.feelslike + '°C.' +
            ' Humidity is: ' + body.current.humidity + '%.'

            callback(undefined, {
                forecast_string,
                forecast_img: body.current.weather_icons[0]
            })
        }
    })
}

module.exports = forecast
