const indicative = require('indicative')

// factory that return a function that filter requests and decide when to create a lead in salesforce
module.exports = function (data, rules) {
  rules = rules || JSON.parse(process.env.FILTER)
  return indicative
    .validate(data, rules)
    .then(() => { return data })
    .catch((error) => {
      // if this is a validation error, return nothing else throw the error
      if (error && error.length > 0 && typeof error[0].field !== 'undefined') {

      } else {
        throw error
      }
    })
}
