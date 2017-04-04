var express = require('express')
var bodyParser = require('body-parser');

const check_if_lead_exists_in_salesforce_already = function (salesforce_client, email) {
  return salesforce_client.query("SELECT Id FROM Lead WHERE email = '" + email + "'")
    .then(res => {
      return res.totalSize > 0
    })
}

module.exports = function (filter, transform, salesforce_client) {
  // create a small express server
  var app = express()
  app.use(bodyParser.json()); // for parsing application/json

  app.post('/', function (req, res) {
    console.log(JSON.stringify(req.body))
    filter(req.body)
      .then(data => {
        if (data) {
          console.log('Event matches the defined rules.')
          const salesforce_object_to_upsert = transform(req.body)
          // console.log(salesforce_object_to_upsert)
          // check that the object as email as a key
          if (typeof salesforce_object_to_upsert.email === 'undefined') {
            throw new Error('Object to be sent to Salesforce need to have an email address')
          }
          // check if this email is already in Salesforce
          return check_if_lead_exists_in_salesforce_already(salesforce_client, salesforce_object_to_upsert.email)
            .then(res => {
              // if lead does not exist yet in Salesforce, create it
              if (!res) {
                console.log('Create lead in Salesforce for email ' + salesforce_object_to_upsert.email)
                return salesforce_client.sobject("Lead").create(salesforce_object_to_upsert)
              }
              console.log('A lead with email ' + salesforce_object_to_upsert.email + ' already exists in Salesforce. Not doing anything.')

            })

        }
        else {
          // don't a salesforce upsert
          console.log('do not trigger upsert')
        }
      })
      .catch(console.error)
    res.send('Done.')
  })

  app.listen(3000, function () {
    console.log('Listen on port 3000!')
  })

  return app
}
