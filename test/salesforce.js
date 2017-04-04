'use strict'

const chai = require('chai')
const expect = chai.expect

require('../lib/get_environment')()
const salesforce = require('../lib/salesforce')

describe('salesforce_client', function () {
  this.timeout(10000)

  // instantiate the salesforce singleton
  before(salesforce.init)

  it('should instantiate a salesforce singleton', () => {
    return salesforce.client.query('SELECT Id, email FROM Lead LIMIT 1')
      .then(results => {
        expect(results).to.have.a.property('totalSize', 1)
      })
  })
})
