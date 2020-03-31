const express = require('express');
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const path = require('path')
const port  = 9000
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const googleSpread = require('./googleSpreadSheet')
const telegram = require('./telegrambot')


app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('./views'))

app.get('/', (req, res) => res.render('test.html'))
app.get('/getList', googleSpread)
app.post('/push', telegram)


app.listen(port,()=>{console.log(`SEMOHOME RUNNING ON ${port}`)})