const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs')
app.set('views', viewsDir)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/user', (req, res) => {
    res.render('user')
})

app.get('/wall', (req, res) => {
    res.render('wall')
})

//Listen call
app.listen(port, () => {
    console.log('running on port: '+port)
})