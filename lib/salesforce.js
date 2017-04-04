var jsforce = require('jsforce');
var Q = require('q')

module.exports = function (credentials) {
  const deferred = Q.defer()
  const conn = new jsforce.Connection()
  conn.login(credentials.username, credentials.password + credentials.security_token)
      .then(function () {
        deferred.resolve(conn)
      }).catch(deferred.reject)
  return deferred.promise
}
