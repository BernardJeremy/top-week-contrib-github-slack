top-week-contrib-github-slack
=================
Node.JS script created to send to slack the top X contributors of a given repository to Slack.

## Features
- Retrieve the whole contributors history for a given GitHub repository.
- Send the top X to a given Skack hook

## Installation
- Simply clone this depot anywhere on your server.
- Copy [config.json.exemple](https://github.com/BernardJeremy/top-week-contrib-github-slack/blob/master/config.json.exemple) file into a `config.json` file.
- Perform `npm install` command.
- Install a [incoming-webhooks](https://api.slack.com/incoming-webhooks) on your Slack.
- Add your link of the Slack incoming-webhooks in the `config.json` file.
- Add your repo data (owner and repository's name) in the `config.json` file.
- Set the TOP data (number of contributors in the top and which value to use) in the `config.json` file.
- Optional : Set a a different channel in the `config.json` file if you want, leave blank to use the default one.
- Optional (but recommended) : Install a task scheduler (like `CRON`) to run the script regularly.

## Configuration
- `link` : Link to the concerned kimsufi.com page.
- `owner` : Owner of the target repository.
- `repo` : Repository's name.
- `nbrInTop` : Number of contributors in the top.
- `topCondition` : Can be `c` (commit), `a` (addition) or `d` (deletion).
- `slackHookUrl` :  Link to your Slack incoming-webhooks.
- `channel` :  Custom channel (include '@' or '#'), leave blank to use the default.
