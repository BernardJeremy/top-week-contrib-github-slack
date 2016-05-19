var request = require('request');
var fs = require('fs');
var Slack = require('slack-node');

var link = require('./config.json').link;
var slackUrl = require('./config.json').slackHookUrl;
var channel = require('./config.json').channel;
var owner = require('./config.json').owner;
var repo = require('./config.json').repo;
var nbrInTop = require('./config.json').nbrInTop;
var topCondition = require('./config.json').topCondition;

var text = 'Last week TOP contributors on GitHub';
var top = [];

var options = {
  url: link.replace(':owner', owner).replace(':repo', repo),
  headers: {
    'User-Agent': 'request',
  },
};

request(options, function (err, resp, html) {
  if (err) {
    return console.error(err);
  }

  var stats = JSON.parse(html);
  var lastWeek;
  for (var user of stats) {
    lastWeek = user.weeks[0];
    for (week of user.weeks) {
      if (week.w > lastWeek.w) {
        lastWeek = week;
      }
    }

    top.push({ user: user.author.login, value: lastWeek[topCondition] });
  }

  var date = new Date(lastWeek.w * 1000);
  text += ' (' + date.toString() + ')\n';

  for (var i = 1; i <= nbrInTop && i < top.length; ++i) {
    var current = top[0];
    var indexToRemove = 0;
    for (var j = 0; j < top.length; ++j) {
      if (top[j].value > current.value) {
        current = top[j];
        indexToRemove = j;
      }
    }

    top.splice(indexToRemove, 1);
    text += i + ': ' + current.user + ' (' + current.value + ')' + '\n';
  }

  console.log(text);

  var msgParameters = {
      username: 'Github Top Contrib',
      channel: channel,
      text: text,
    };

  var slack = new Slack();
  slack.setWebhook(slackUrl);
  slack.webhook(msgParameters, function (err, response) {
    if (response.statusCode != 200) {
      console.log(response);
    }
  });
});
