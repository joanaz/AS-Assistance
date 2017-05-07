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
            "WELCOME_MESSAGE": "Hello, I'm your personal assistant. You can say 'I want water', 'lunch menu', 'dinner menu', 'adjust bed', 'lower blinds', 'rise blinds', 'change TV channel'. ",
            "WELCOME_REPROMPT": "Hello, I'm your personal assistant. You can say 'I want water', 'lunch menu', 'dinner menu', 'adjust bed', 'lower blinds', 'rise blinds', 'change TV channel'. ",
            "WELCOME_CARD": "Hello",
            "HELP_MESSAGE": "Hello, I'm your personal assistant. You can say 'I want water', 'lunch menu', 'dinner menu', 'adjust bed', 'lower blinds', 'rise blinds', 'change TV channel'. ",
            "HELP_CARD": "Help",
            "STOP_MESSAGE": "See you next time.",
            "STOP_CARD": "Goodbye",
            "LUNCH_MESSAGE": "For lunch, there will be turkey sandwiches and chocolate chip cookies",
            "LUNCH_CARD": "Lunch",
            "DINNER_MESSAGE": "For dinner, there will be meatball pasta and lemon cheesecake",
            "DINNER_CARD": "Dinner",
            "WATER_MESSAGE": "The nurse is on her way with your water. ",
            "WATER_CARD": "Water",
            "NURSE_MESSAGE": "The nurse is notified, she will be with you soon. ",
            "NURSE_CARD": "Notified",
            "ERROR_CARD": "Error",
            "BYE_MESSAGE": "You are welcome",
            "BYE_CARD": "Bye"
        }
    }
};

var handlers = {
    'LaunchRequest': function() {
        this.emit('SayHello');
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
        this.emit(':askWithCard', this.t("LUNCH_MESSAGE"), this.t("LUNCH_MESSAGE"), this.t("LUNCH_CARD"), this.t("LUNCH_MESSAGE"));
    },
    'DinnerMenuIntent': function() {
        this.emit(':askWithCard', this.t("DINNER_MESSAGE"), this.t("DINNER_MESSAGE"), this.t("DINNER_CARD"), this.t("DINNER_MESSAGE"));
    },
    'WaterIntent': function() {
        let alexa = this;
        client.messages.create({
                body: 'Hi, I\'m Joanna, can I get some water please?',
                to: keys.myPhoneNum, // Text this number
                from: keys.twilioNum // From a valid Twilio number
            })
            .then((message) => {
                console.log(message.sid)
                alexa.emit(':askWithCard', alexa.t("WATER_MESSAGE"), alexa.t("WATER_MESSAGE"), alexa.t("WATER_CARD"), alexa.t("WATER_MESSAGE"));
            });
    },
    'AdjustBedIntent': function() {
        let alexa = this;
        client.messages.create({
                body: 'Hi, I\'m Joanna, can I get my bed fixed please?',
                to: keys.myPhoneNum, // Text this number
                from: keys.twilioNum // From a valid Twilio number
            })
            .then((message) => {
                console.log(message.sid)
                alexa.emit(':askWithCard', alexa.t("NURSE_MESSAGE"), alexa.t("NURSE_MESSAGE"), alexa.t("NURSE_CARD"), alexa.t("NURSE_MESSAGE"));
            });
    },
    'AdjustBlindsIntent': function() {
        let alexa = this;
        let adjustment = this.event.request.intent.slots.adjustment.value;
        client.messages.create({
                body: 'Hi, I\'m Joanna, can you please ' + adjustment + ' my blinds?',
                to: keys.myPhoneNum, // Text this number
                from: keys.twilioNum // From a valid Twilio number
            })
            .then((message) => {
                console.log(message.sid)
                alexa.emit(':askWithCard', alexa.t("NURSE_MESSAGE"), alexa.t("NURSE_MESSAGE"), alexa.t("NURSE_CARD"), alexa.t("NURSE_MESSAGE"));
            });
    },
    'AdjustTVIntent': function() {
        let alexa = this;
        client.messages.create({
                body: 'Hi, I\'m Joanna, can you please change my TV channel?',
                to: keys.myPhoneNum, // Text this number
                from: keys.twilioNum // From a valid Twilio number
            })
            .then((message) => {
                console.log(message.sid)
                alexa.emit(':askWithCard', alexa.t("NURSE_MESSAGE"), alexa.t("NURSE_MESSAGE"), alexa.t("NURSE_CARD"), alexa.t("NURSE_MESSAGE"));
            });
    },
    'QuitIntent': function() {
        this.emit(':tellWithCard', this.t("BYE_MESSAGE"), this.t("BYE_CARD"), this.t("BYE_MESSAGE"));

    }
};