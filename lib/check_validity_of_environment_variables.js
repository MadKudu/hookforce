const Q = require('q')
const salesforce = require('./salesforce')

module.exports = function () {
  console.log('Checking the proper setup of the environment variables...')

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

  if (!process.env.TRANSFORM) {
    throw new Error('TRANSFORM needs to be defined as an environment variable')
  }

  // try to parse the Transform conditions
  try {
    JSON.parse(process.env.TRANSFORM)
  } catch (e) {
    throw new Error('The TRASNFORM environment variable could not be parsed')
  }

  // test the Salesforce connection
  return salesforce.client.query("SELECT Id FROM Lead LIMIT 1")
    .then(res => {
      if (res.totalSize) {return}
      else {
        throw new Error()
      }
    })
    .catch(err => {
      console.error(err)
      console.error('There was an issue connecting to Salesforce.')
    })
}
