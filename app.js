const request = require('postman-request')
const express = require('express')
const app = express()
const Weather = require('./utils/weather')
const {engine} = require('express-handlebars')
const path = require('path');

// Configure Handlebars
app.engine('hbs', engine({
    extname: '.hbs', // Make sure we use .hbs files
    defaultLayout: false, // No default layout unless specified
    partialsDir: 'views/partials' // Specify the partials directory
 }))
app.set('view engine', 'hbs'); // Set Handlebars as the view engine
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'views')));

//making routes
app.get('',(req,res) => {
    res.render('index',{
        title:'Home',
        name:'mustafa'
    })
})

app.get('/weather', (req, res) => {
if (!req.query.address) {
    return res.send({
        error: 'Must provide an address!',
    });
}

const address = req.query.address;

Weather(address, (error, data) => {
if (error) {
    return res.send({error})
}
res.send({temperature:data.temperature})
});
});


app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        name:'mustafa'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name:'mustafa'
    })
})

app.get('help/*',(req,res) => {
    res.render('error',{
        error:'Help article not found',
        name:'mustafa'
    })
 })


app.get('*',(req,res) => {
    res.render('error',{
        error:'Page not found',
        name:'mustafa'
    })
 })

app.listen('3000',() => {console.log("server is running on 'localhost:3000'")})