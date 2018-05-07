const indicative = require('indicative')

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

const rules = {
  'type': 'equals:identify',
  'traits.email': 'required|email',
  'traits.mk_is_personal': 'required|is_false',
  'traits.mk_is_edu': 'required|is_false',
  'traits.mk_is_disposable': 'required|is_false',
  'traits.mk_is_student': 'required|is_false'
}

const data = {
  'userId': 'lila@42debut.com',
  'traits': {
    'email': 'lila@42debut.com',
    'mk_is_student': false,
    'mk_is_edu': false,
    'mk_is_personal': false,
    'mk_is_disposable': false,
    'mk_company_name': '42 Technologies',
    'mk_customer_fit_segment': 'low',
    'mk_first_name': 'Lila',
    'mk_last_name': 'Cantor'
  },
  'context': {
    'active': false
  }
}

indicative
.validate(data, rules)
.then(function () {
  console.log('passed')
})
.catch(function (errors) {
  console.log(errors)
})
