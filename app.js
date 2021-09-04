const express  = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const path = require('path')
const passport = require('passport')
const session = require('express-session')

// Load config
dotenv.config({path:'./config/config.env'})

// Passport Config
require('./config/passport')(passport)

connectDB()

const app = express()


app.use(morgan('dev'))

// Handlebars
app.engine('.hbs', exphbs({defaultLayout:'main',extname: '.hbs'}));

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false 
  }))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', '.hbs');

// Static Folder / CSS
app.use(express.static(path.join(__dirname,'public')))

// @Routes
app.use('/',require('./routes/index'))
app.use('/',require('./routes/auth'))

const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))