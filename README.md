# What it's for

Hookforce is an open-source service that creates leads in Salesforce when a webhook is called and the data passed are matching some conditions you define.

It is useful when you want to create new leads in Salesforce only if a lead is found interesting for sales.

Alternatives: if you have a small number of leads, checkout [Zapier](https://zapier.com/). It is powerful and easy to use.

# What it does

Hookforce is a small express server that provides an end-point you can send your data to.

(1) Data sent to Webhook -> (2) Filter -> (3) Transform -> (4) Create leads in Salesforce

### (1) Data sent to Webhook
The lead information needs to be passed to the Webhook at the body of a `POST` HTTP request.

### (2) Filter
This step decides whether or not this lead should be in Salesforce. We use the "schema rules" syntax of [Indicative](http://indicative.adonisjs.com/) to configure the filter.

For example, let's say our filter config is `{"type": "equals:identify", "traits.mk_customer_fit":"required|in:good,very good"}`.

The filter step will create a lead in Salesforce for this POST body:
```
{
  type: 'identify',
  traits: {
    email: 'bob@bigco.com',
    mk_customer_fit: 'good'
  }
}
```

It won't create a lead in Salesforce for this POST body:
```
{
  type: 'identify',
  traits: {
    email: 'badlead@yopmail.com',
    mk_customer_fit: 'low'
  }
}
```


### (3) Transform
This step is about preparing a key-value object that we will use to create the lead in Salesforce. We use the template syntax of [jsonpath-object-transform](https://github.com/dvdln/jsonpath-object-transform) for configuring this step.

For example, let's say our transform configuration is `{"email":"$.traits.email","leadsource":"trial signup", "name":"$.traits.name"}`.

The json posted to this webhook:
```
{
  type: 'identify',
  traits: {
    email: 'bob@bigco.com',
    name: 'Bob Dilon',
    mk_customer_fit: 'good'
  }
}
```
will be transformed into this key-value object before creating the lead in Salesforce:
```
{
  email: 'bob@bigco.com',
  leadsource: 'trial signup',
  name: 'Bob Dilon'
}
```

Important:
- The name of the keys need to be the same as the API name of the lead fields in Salesforce.
- The object needs to have an email key.

### (4) Create leads in Salesforce
This step checks if a lead with a same email address already exists in Salesforce. If no lead is found, it will create the lead in Salesforce.


# How to set this up

1. Deploy this service to a platform like [Heroku](https://www.heroku.com/)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

2. After deploying, go into Settings (https://cl.ly/0H231r052J0V) and click on "Reveal Config Vars" (https://cl.ly/2I0b3H2F1R2E). Configure the following environment variables with the following:

```
FILTER={"type": "equals:identify", "traits.mk_customer_fit_segment":"required|in:good,very good"}
TRANSFORM={"email":"$.traits.email","mk_customer_fit_segment__c": "$.traits.mk_customer_fit_segment", "leadsource":"Signup", "FirstName":"$.traits.mk_first_name", "LastName":"$.traits.mk_last_name", "Company":"$.traits.mk_company_name", "mk_job_role__c":"$.traits.mk_job_role", "mk_seniority__c":"$.traits.mk_seniority"}

SALESFORCE_USERNAME=zzz
SALESFORCE_PASSWORD=zzz
SALESFORCE_TOKEN=zzz
```
You can find your token under "Reset My Security Token" in your Personal Settings in Salesforce.

To check if you've you're set up, go to "View logs" under "More" (https://cl.ly/272b1Y061419).

3. Under Heroku Settings, find your domain. Usually it's https://{APP_NAME}.herokuapp.com/

4. Now go into Segment and active the Webhook integration (https://cl.ly/0c3F0n1U1643). It might already be live depending on your environment.

5. Add a webhook and paste in the Heroku domain (https://cl.ly/0Y2D2M2o0N41)

6. Save and activate the integration, if necessary

You're all set.


# Example: Setting up hookforce with Segment and MadKudu

Here is a typical scenario. An `identify` event is sent to Segment when there is a lead signs up. This event is sent to MadKudu which qualify this lead and emit another `identify` event with a "mk_customer_fit" attributes to indicate the quality of this lead. We'd like to create a lead in Salesforce only if the mk_customer_fit attribute is good or very good.

Below the steps to set up this flow assuming you've set up a hookforce service in Heroku and you have MadKudu live receiving/sending identify events from/to Segment.

1. Log in Heroku, go to your hookforce app settings, and update the 'config variables'.

2. Log in Segment, go to the appropriate 'Segment source', click "Integrations", and choose "Webhooks". Setup here the url of your hookforce service.

3. You can test the flow by creating a fake identify event running a code like this in the web console on your your site. The lead will be created in Salesforce.
```
analytics.reset()
analytics.identify({email: 'sam@madkudu.com', mk_customer_fit_segment: 'good'})
```

That's it!


# Testing out on a local machine

Simply run `npm install` and use [Ultrahook](http://www.ultrahook.com/) to test.
