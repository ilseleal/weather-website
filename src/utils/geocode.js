const request = require('request')

//=============================================================================
//Previous code without callback
//const url_map = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiaWxzZWxlYWwiLCJhIjoiY2toNmNuNXcyMGIwNDJ5bnh4a2p4NmFqcSJ9.gMkuNqNx38YRwxpOhk8dYA&limit=1'
//Example of incorrect URI:
//const url_map = 'https://api.mapbox.com/geocoding/v5/mapbox.places/203939dhhd.json?access_token=pk.eyJ1IjoiaWxzZWxlYWwiLCJhIjoiY2toNmNuNXcyMGIwNDJ5bnh4a2p4NmFqcSJ9.gMkuNqNx38YRwxpOhk8dYA&limit=1'
//
// request({url: url_map, json: true}, (error, response) => {
//     if (error) {
//         console.log('Could not reach geolocating service.')
//     } else if(response.body.features.length === 0) {
//         console.log('Could not find the specified location.')
//     }
//     else {
//             const coord = response.body.features[0].geometry.coordinates
//             //response.body.features[0].center[0] was also correct for longitude
//             //response.body.features[0].center[1] was also correct for latitude 
//             console.log('Latitude: ' + coord[1] + ' longitude: ' + coord[0])
//     }
//=============================================================================

const geocode = (address, callback) => {
    //Geocode async request
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaWxzZWxlYWwiLCJhIjoiY2toNmNuNXcyMGIwNDJ5bnh4a2p4NmFqcSJ9.gMkuNqNx38YRwxpOhk8dYA&limit=1'
   request({url, json: true}, (error, {body}) => {
       if (error) {
           callback('Could not reach geocode service. Check your Internet connection.', undefined)
       } else if (body.features.length === 0) {
           callback('Unable to find specified location. Try another search.', undefined)
       } else {
           callback(undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name 
           })
       }
   }) 
}

module.exports = geocode

//-----------------------------------------------------------------------------
// Default public token for my account in MapBox:
// pk.eyJ1IjoiaWxzZWxlYWwiLCJhIjoiY2toNmNuNXcyMGIwNDJ5bnh4a2p4NmFqcSJ9.gMkuNqNx38YRwxpOhk8dYA
// account.mapbox.com
//-----------------------------------------------------------------------------
