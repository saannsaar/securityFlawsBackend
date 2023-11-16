require('dotenv').config()

const PORT = process.env.PORT || 3002
console.log(PORT)
const MONGODB_URI = process.env.MONGODB_URI

console.log(MONGODB_URI)

module.exports = {
    MONGODB_URI,
    PORT
}