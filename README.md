# generator-discordbot [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> creates a base template to start a new Discord bot using discord.js

`generator-discordbot` is an easy way to get started creating a [Discord](http://discordapp.com) bot.

`generator-discordbot` will include:

* [discord.js](https://github.com/hydrabolt/discord.js), a library that allows you to interact with the [Discord API](https://discordapp.com/developers/docs/intro).
* [clapp](https://github.com/MeLlamoPablo/clapp), a module that makes your bot behave like in a command line interface.

`generator-discordbot` is based on [generator-node](https://github.com/yeoman/generator-node), so your project will also include:

* A filled `package.json` file
* [gulp](http://gulpjs.com/) task runner
* [mocha](http://mochajs.org/) unit test
* [ESLInt](http://eslint.org/) linting and code style checking
* [Istanbul](https://gotwarlost.github.io/istanbul/) code coverage (optionally tracked on [Coveralls](https://coveralls.io/))
* [Travis CI](https://travis-ci.org/) continuous integration (optional)
* [License](https://spdx.org/licenses/)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-discordbot using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
$ npm install -g yo
$ npm install -g generator-discordbot
```

Then generate your new project:

```bash
$ yo discordbot
```

## Getting started

After the generation is done, first make sure that your `config.js` looks ok. Then you may start working in your bot. Your bot's files are located in the `/lib` folder. `index.js` is your entry point. You may add your bot's commands to the `/commands` folder, and they will be automatically bound to your app. To learn how to create a command, please refer to the [clapp documentation](http://mellamopablo.github.io/clapp/latest.html). To learn how to interact with the Discord API, refer to the [discord.js documentation](http://hydrabolt.github.io/discord.js/#!/docs/tag/master/file/general/Welcome).

Once you are done working, you can run your bot from your root folder with:

```bash
$ npm run bot
```

## License

Apache-2.0 © [Pablo Rodríguez](https://github.com/MeLlamoPablo)


[npm-image]: https://badge.fury.io/js/generator-discordbot.svg
[npm-url]: https://npmjs.org/package/generator-discordbot
[daviddm-image]: https://david-dm.org/MeLlamoPablo/generator-discordbot.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/MeLlamoPablo/generator-discordbot
