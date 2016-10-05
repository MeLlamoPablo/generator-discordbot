'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the shining ' + chalk.red('generator-discordbot') + ' generator!'
    ));

    this.composeWith('node:app', {
      options: {
        babel: false,
        boilerplate: false,
        readme: "## Installation" + "\n"
              + "\n"
              + "Clone this repository, and run:" + "\n"
              + "```sh" + "\n"
              + "$ npm install" + "\n"
              + "```" + "\n"
              + "\n"
              + "## Usage" + "\n"
              + "\n"
              + "```js" + "\n"
              + "$ npm run bot" + "\n"
              + "```"
      }
    }, {
      local: require.resolve('generator-node/generators/app')
    });

    var prompts = [{
      name: 'botName',
      message: 'Your bot\'s username (without the discriminator; you can add this later)',
      default: 'My Discord Bot'
    }, {
      name: 'token',
      message: 'Your bot\'s token (you can add this later)',
      default: ''
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // Copy templates:
    // ./lib
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('lib/index.js')
    );

    this.fs.copyTpl(
      this.templatePath('config.js'),
      this.destinationPath('config.js'), {
        botName: this.props.botName,
        prefix: '-' + _.toLower(this.props.botName),
        token: this.props.token
      }
    );

    // ./lib/commands
    this.fs.copyTpl(
      this.templatePath('commands/foo.js'),
      this.destinationPath('lib/commands/foo.js')
    );

    // ./lib/modules/clapp-discord
    this.fs.copyTpl(
      this.templatePath('modules/clapp-discord/index.js'),
      this.destinationPath('lib/modules/clapp-discord/index.js')
    );

    this.fs.copyTpl(
      this.templatePath('modules/clapp-discord/str-en.js'),
      this.destinationPath('lib/modules/clapp-discord/str-en.js')
    );

    this.fs.copyTpl(
      this.templatePath('modules/clapp-discord/package.json'),
      this.destinationPath('lib/modules/clapp-discord/package.json')
    );

    // ./test
    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/index.js'), {
        pkgName: _.camelCase(this.props.botName)
      }
    );

    // Add the "run bot" script to the package.json
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    var scripts = {
      "bot": "node ./lib/index.js"
    };

    _.extend(pkg, {
      scripts: scripts
    });

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  install: function () {
    this.npmInstall(['discord.js', 'clapp'], {
      'save': true
    });

    this.installDependencies({
      bower: false
    });
  }
});
