var chai = require('chai')
var expect = chai.expect
var chai_as_promised = require("chai-as-promised")
chai.use(chai_as_promised)

const credentials = {
  username: 'sam@392bloom.com',
  password: 'zzz',
  security_token: 'zzz'
}

describe('salesforce_client', function() {
  this.timeout(10000)

  it('returns a salesforce client and we can run a query', () => {
    const get_salesforce_client = require('../lib/salesforce')
    return expect(get_salesforce_client(credentials)
      .then(salesforce_client => {
        return salesforce_client.query('SELECT Id, email FROM Lead LIMIT 1')
          // .then(console.log)
          // .catch(console.log)
      })
      .catch(err => {
        console.log(err)
      })
    ).to.eventually.have.property('done')
  });
});
