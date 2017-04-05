'use strict'

const filter = require('./filter')
const transform = require('./transform')

const salesforce = require('./salesforce')

const does_lead_exist = function (email) {
  return salesforce.client.query("SELECT Id FROM Lead WHERE email = '" + email + "' LIMIT 1")
    .then(res => res.totalSize > 0)
}

module.exports = function (req, res, next) {
  filter(req.body)
    .then(data => {
      if (data) {
        console.log('Event matches the defined rules.', data)
        const salesforce_object = transform(req.body)

        // check that the object as email as a key
        if (typeof salesforce_object.email === 'undefined') {
          throw new Error('Object to be sent to Salesforce need to have an email address')
        }
        // check if this email is already in Salesforce
        return does_lead_exist(salesforce_object.email)
          .then(res => {
            // if lead does not exist yet in Salesforce, create it
            if (!res) {
              console.log('Create lead in Salesforce for email ' + salesforce_object.email)
              return salesforce.client.sobject('Lead').create(salesforce_object)
            }
            console.log('A lead with email ' + salesforce_object.email + ' already exists in Salesforce. Not doing anything.')
          }).then(() => {
            res.send('Done!')
          })
      } else {
        // don't do a salesforce upsert
        console.log('do not trigger upsert')
        res.send('Done!')
      }
    })
    .catch(next)
}
