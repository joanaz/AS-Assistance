'use strict';
/**
 * A Lambda function for handling Alexa Skill MirrorMirrorOnTheWall requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa On The Wall, find Snow White."
 *  Alexa: "Yes my Queen, showing images of Snow White."
 */

const Alexa = require('alexa-sdk');

// Load the twilio module
const keys = require('./keys.json');
var twilio = require('twilio');
var client = new twilio(keys.SID, keys.token);

/**
 * App ID for the skill
 * 
 * replace with your app ID 
 */
const APP_ID = "amzn1.ask.skill.ab242a44-ae07-4b0d-bb50-1e53cdee4026";

exports.handler = function(event, context, callback) {
    let alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var languageStrings = {
    "en-US": {
        "translation": {
            "WELCOME_MESSAGE": "Hello, I'm your personal assistant. You can say 'I want water', 'lunch menu', 'dinner menu', 'adjust bed', 'adjust blind', 'change TV channel'. ",
            "WELCOME_REPROMPT": "",
            "WELCOME_CARD": "Hello",
            "HELP_MESSAGE": "",
            "HELP_CARD": "Help",
            "STOP_MESSAGE": "See you next time, my Queen!",
            "STOP_CARD": "Goodbye",
            "LUNCH_MESSAGE": "turkey sandwich, chocolate cookies",
            "LUNCH_CARD": "Lunch",
            "DINNER_MESSAGE": "turkey sandwich, chocolate cookies",
            "DINNER_CARD": "Dinner",
            "WATER_MESSAGE": "The nurse is on her way with your water",
            "WATER_CARD": "WATER",

            "ERROR_CARD": "Error"
        }
    }
};

var handlers = {
    'LaunchRequest': function() {
        alexa.emit('SayHello');
    },
    'HelloIntent': function() {
        this.emit('SayHello');
    },
    'SayHello': function() {
        this.emit(':askWithCard', this.t("WELCOME_MESSAGE"), this.t("WELCOME_REPROMPT"), this.t("WELCOME_CARD"), this.t("WELCOME_MESSAGE") + this.t("WELCOME_REPROMPT"));
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':askWithCard', this.t("HELP_MESSAGE"), this.t("HELP_MESSAGE"), this.t("HELP_CARD"), this.t("HELP_MESSAGE"));
    },
    'AMAZON.StopIntent': function() {
        this.emit('StopCommand');
    },
    'AMAZON.CancelIntent': function() {
        this.emit('StopCommand');
    },
    'StopCommand': function() {
        this.emit(':tellWithCard', this.t("STOP_MESSAGE"), this.t("STOP_CARD"), this.t("STOP_MESSAGE"));
    },
    'LunchMenuIntent': function() {
        this.emit(':tellWithCard', this.t("LUNCH_MESSAGE"), this.t("LUNCH_CARD"), this.t("LUNCH_MESSAGE"));
    },
    'DinnerMenuIntent': function() {
        this.emit(':tellWithCard', this.t("DINNER_MESSAGE"), this.t("DINNER_CARD"), this.t("DINNER_MESSAGE"));
    },
    'WaterIntent': function() {
        // Pass in parameters to the REST API using an object literal notation. The
        // REST client will handle authentication and response serialzation for you.
        let alexa = this;
        client.messages.create({
                body: 'Hi, I\'m Joanna, can I get some water please!',
                to: '+19173250738', // Text this number
                from: '+19179246543 ' // From a valid Twilio number
            })
            .then((message) => {
                console.log(message.sid)
                alexa.emit(':tellWithCard', alexa.t("WATER_MESSAGE"), alexa.t("WATER_CARD"), alexa.t("WATER_MESSAGE"));
            });
    },
    'AdjustBedIntent': function() {
        // Pass in parameters to the REST API using an object literal notation. The
        // REST client will handle authentication and response serialzation for you.
        let alexa = this;
        client.messages.create({
                body: 'Hi, I\'m Joanna, can I get my bed fixed please!',
                to: '+19173250738', // Text this number
                from: '+19179246543 ' // From a valid Twilio number
            })
            .then((message) => {
                console.log(message.sid)
                alexa.emit(':tellWithCard', alexa.t("WATER_MESSAGE"), alexa.t("WATER_CARD"), alexa.t("WATER_MESSAGE"));
            });
    },
    'AdjustBlindsIntent': function() {
        // Pass in parameters to the REST API using an object literal notation. The
        // REST client will handle authentication and response serialzation for you.
        let alexa = this;
        client.messages.create({
                body: 'Hi, I\'m Joanna, can I get some water please!',
                to: '+19173250738', // Text this number
                from: '+19179246543 ' // From a valid Twilio number
            })
            .then((message) => {
                console.log(message.sid)
                alexa.emit(':tellWithCard', alexa.t("WATER_MESSAGE"), alexa.t("WATER_CARD"), alexa.t("WATER_MESSAGE"));
            });
    },
    'AdjustTVIntent': function() {
        // Pass in parameters to the REST API using an object literal notation. The
        // REST client will handle authentication and response serialzation for you.
        let alexa = this;
        client.messages.create({
                body: 'Hi, I\'m Joanna, can I get some water please!',
                to: '+19173250738', // Text this number
                from: '+19179246543 ' // From a valid Twilio number
            })
            .then((message) => {
                console.log(message.sid)
                alexa.emit(':tellWithCard', alexa.t("WATER_MESSAGE"), alexa.t("WATER_CARD"), alexa.t("WATER_MESSAGE"));
            });
    }
};