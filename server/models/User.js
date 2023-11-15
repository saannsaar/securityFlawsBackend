const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true,
        minlength: 3,
    },
    name: String,
    password: String,
    // passwordHash: String,
    diaryentries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Diary'
        }
    ],
})


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // Cause we dont want to send password in any form to anywhere
      // delete returnedObject.passwordHash
    }
  })


  
const User = mongoose.model('User', userSchema)
module.exports = User