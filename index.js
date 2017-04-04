require('dotenv').config({path: 'test/env_variables.env'})

// check that the environment variables have been setup properly
require('./lib/check_environment_variables')()

// get the filter method that decide when to create a lead in salesforce
const filter = require('./lib/filter')

// get the mapper method to transform the body data into a object that can be sent to Salesforce
const transform = require('./lib/transform')

// get a salesforce client that will upsert leads in salesforce
const salesforce_creds = {
  username: process.env.SALESFORCE_USERNAME,
  password: process.env.SALESFORCE_PASSWORD,
  security_token: process.env.SALESFORCE_TOKEN
}

require('./lib/salesforce')(salesforce_creds)
    .then(salesforce_client => {
      var app = require('./lib/app')(filter, transform, salesforce_client)
    })
    .catch(console.error)
