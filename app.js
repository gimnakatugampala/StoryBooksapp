const express  = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

// Load config
dotenv.config({path:'./config/config.env'})

// Passport Config
require('./config/passport')(passport)

connectDB()

const app = express()


app.use(morgan('dev'))


// Body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Handlebars Helpers
const {formatData,truncate,stripTags } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', exphbs({helpers:{formatData,truncate,stripTags},defaultLayout:'main',extname: '.hbs'}));

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', '.hbs');

// Static Folder / CSS
app.use(express.static(path.join(__dirname,'public')))

// @Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))