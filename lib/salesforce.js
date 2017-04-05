const jsforce = require('jsforce')

module.exports.client = {}

const credentials = {
  username: process.env.SALESFORCE_USERNAME,
  password: process.env.SALESFORCE_PASSWORD,
  security_token: process.env.SALESFORCE_TOKEN
}

// instantiate the salesforce singleton
module.exports.init = function () {
  const client = new jsforce.Connection()
  module.exports.client = client
  return client.login(credentials.username, credentials.password + credentials.security_token)
    .then(() => client)
}
