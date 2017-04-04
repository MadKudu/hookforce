require('dotenv').config()

module.exports = function () {
  console.log('Checking the proper setting of the environment variables...')

  // check if filter variable is defined
  if (!process.env.FILTER) {
    throw new Error('FILTER needs to be defined as an environment variable')
  }

  // try to parse the filter conditions
  try {
    JSON.parse(process.env.FILTER)
  } catch (e) {
    throw new Error('The FILTER environment variable could not be parsed')
  }
}
