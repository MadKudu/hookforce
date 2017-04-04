'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const upsert_lead = require('./upsert_leads')

const app = express()
app.use(bodyParser.json()) // for parsing application/json

app.post('/', upsert_lead)

module.exports = app
