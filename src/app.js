const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geoCode = require('./utils/geoCode')

const port = process.env.PORT || 3000  //declare port for heroku deployment
// console.log(__dirname);
// console.log(__filename)

//define path for express config
const publicPathDir = path.join(__dirname, '../public') //for access index, help, about page
const viewPath = path.join(__dirname, '../template/views') //for rename view folder->template
const partialPath = path.join(__dirname, '../template/partials') //for partial(header,footer)

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicPathDir))

app.get('', (req, res) => {
res.render('index', {
title:'Weather App',
name:'yogesh mishra'
})
})

app.get('/about', (req, res) => {
res.render('about', {
title:'about me',
name:'yogesh mishra'
})
})

app.get('/help', (req, res) => {
res.render('help', {
title:' help desk',
name:'yogesh mishra '
})
})

// app.get('/help', (req, res) => {
// res.send('can i help you ?')
// })
// app.get('/about', (req, res) => {
// res.send('<h1>this is about page !</h1>')
// })
app.get('/weather', (req, res) => {
  if (!req.query.address) {//it's return the search term by address query
    return res.send({
      error:'you must provide a search term'
    })
  }
  geoCode(req.query.address, (error, { latitude, longitude, place } = {}) => {
  //geoCode(address, (error, data) => {
  if (error) {
    return res.send({error })
  }
  forecast(latitude, longitude, (error, data) => {
    if (error) {
    return res.send({error})
    }
res.send({
  forecast: data,
  place,
  address:req.query.address
})
  });
});
  //console.log(req.query.address)
})

// app.get('/products', (req, res) => {
//   if(!req.query.address){
//     res.send({
//       error:'you must provide a search term'
//     })
//   }
//  console.log(req.query.address)
//     res.send({
//       products:[]
//     })
// })



app.get('/help/*', (req, res) => {
res.render('404', {
title:'404',
name:'yogesh mishra',
errorMsg:'help page does not found'
})
})

app.get('*', (req, res) => {
res.render('404', {
title:'404',
name:'yogesh mishra',
errorMsg:'page not found check your connection'
})
})

app.listen(port, () => {
  console.log(`express server is start at port ${port} `)
})