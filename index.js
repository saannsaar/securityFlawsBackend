const config = require('./utlis/config')
const express = require('express')
const cors = require('cors')
const app = express();







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


app.use('/api/diaries', diaryRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

  
  app.use(middleware.unknownEndpoint)


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });


app.listen(config.PORT, () => {
    console.log(`Server listening on ${config.PORT}`);
  });