const indicative = require('indicative')

// factory that return a function that filter requests and decide when to create a lead in salesforce
module.exports = function (data, rules) {

  // Extending the schema validator to get "is_false"
  const isFalse = function (data, field, message, args, get) {

    return new Promise(function (resolve, reject) {

      // get value of field under validation
      const fieldValue = get(data, field)

      // resolve if value does not exists, value existence
      // should be taken care by required rule.
      if (!fieldValue) {
        return resolve()
      } else {
        return reject(message)
      }
    })
  }

  indicative.extend('isFalse', isFalse, 'value should be false')

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
