const diaryRouter = require('express').Router()


const Diary = require('../models/Diary')
const User = require('../models/User')

// Use this to decrypt the password 
// const {userExtractor } = require('../utlis/middleware')


// Would add userExtractor to here like
//diaryRouter.get('/', userExtractor, async (request, response)
diaryRouter.get('/', async (request, response) => {

    // if (!request.user) {
    // response.status(401).json('You cant do that") // And dont and sensitive errormessages here
    //}
   
    // Here  find only the ones that the logged in user has added so that 
   const diaries = await Diary.find({})
   console.log(diaries)
   response.json(diaries)
})


// Would add userExtractor to here like
//diaryRouter.post('/', userExtractor, async (request, response)
diaryRouter.post('/',  async (request, response) => {
    const body = request.body

   console.log(body)
    const user = User.find({username: request.body.user})
    // console.log(user)
    // if (!user) {
    //   return response.status(401).json({error: error})
    // }

    
  try {
    const diaryobj = new Diary({

        title: body.title,
        content: body.content,
        date: body.date,
        user: user._id,
       
    })
    
   const savedDiary = await diaryobj.save()
   user.diaryentries = user.diaryentries.concat(savedDiary._id)
   await user.save()
   
   response.status(201).json(savedDiary)
  } catch(error) {
    // Use logger instead and just add some selfmade error message that doesnt include any real error info
     // Better way to prevent error message generation containing sensitive information flaws would be:
        // return response.status(401).send({error: "Diary entry creation failed"})
    response.status(401).json(error)
  }
})

  diaryRouter.delete('/:id', async (request, response) => {
    const findDiary = await Diary.findById(request.params.id)
    console.log(findDiary)
    const user = User.findById(request.body.user)
    if (!user || findDiary.user.toString() !== user.id.toString()) {
      return response.status(401).json({error: "You cant do that!"})
    }

  try {
    user.diaryentries = user.diaryentries.filter(diary => diary.toString() !== findDiary.id.toString())
    await user.save()
    await findDiary.deleteOne()
    response.status(204).end()
  } catch(error) {
     // Better way to prevent error message generation containing sensitive information flaws would be:
        // return response.status(401).send({error: "Delete action failed"})
    response.status(401).json(error)
  }
  })
  


module.exports = diaryRouter