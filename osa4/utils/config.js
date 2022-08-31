/**
 * Module contains configuration handling.
 */

require('dotenv').config()

let PORT = process.env.MONGOPORT
let MONGODB_URI = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGOURL
    : process.env.MONGOURL
 
module.exports = {
  MONGODB_URI,
  PORT
}