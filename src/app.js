const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Initialize Express app
const app = express()
//Access Heroku port number OR if Heroku doesn't set the port, use 3000
const port = process.env.PORT || 3000

//-----------------------------------------------------------------------------
//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//-----------------------------------------------------------------------------

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //El primer argumento es el nombre del archivo .hbs
    //que se va a desplegar. No se requiere incluir la
    //extensión de archivo hbs.
    res.render('index', {
        title: "Weather app",
        name: "Los Gogos"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About dynamic page",
        name: "Los Gogos"
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        message: "This is a help message",
        title: "Help page",
        name: "Los Gógoros"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }


    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error)
            return res.send({ error})

        forecast(latitude, longitude, (error, response) => {
            if (error) 
                return res.send({ error })

            res.send({
                location,
                forecast: response.forecast_string,
                address: req.query.address,
                icon: response.forecast_img
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help Page',
        name: 'Guga... GoGA',
        message: 'This help page was not found'
    })    
})

app.get('*', (req, res ) => {
    res.render('404', {
        title: '404 Page',
        name: 'Guguis',
        message: '404 Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
