const config = require('./utlis/config')
const express = require('express')
const cors = require('cors')
const app = express();

// Should use logger to log relevant information for example about login failures into a logfile:
// const winston = require('winston')
//const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//   ],
// })

// app.use(err, request, response, next) => {
//   requestLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
//   next(error)
// }

// We should specify from what specific origin requests are allowed like this:
// const corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200,
// }

// app.use(cors(corsOptions))


app.use(cors())
console.log(config)
const mongoose = require('mongoose')

const diaryRouter = require('./controllers/diaries')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const middleware = require('./utlis/middleware')


mongoose.set('strictQuery', false)


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/diaries', diaryRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

  
  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });


app.listen(config.PORT, () => {
    console.log(`Server listening on ${config.PORT}`);
  });