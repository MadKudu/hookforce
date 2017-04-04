
// load the environment variables
require('./lib/get_environment')()

const salesforce = require('./lib/salesforce')
const app = require('./lib/app')

const PORT = process.env.PORT || 3000

salesforce.init().then(() => {
  app.listen(PORT, function () {
    console.log('hookforce started on port ' + PORT)
  })
})
