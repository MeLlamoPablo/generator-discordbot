var Clapp      = require('clapp');
var printTable = require('tableprinter');
var str        = require('./str-en.js');

class App extends Clapp.App {
  constructor(options, onReply, commands = []) {
    super(options, onReply, commands);
  }

  _getHelp() {
    var r =
        this.name + (typeof this.version !== 'undefined' ? ' v' + this.version : '') + '\n' +
        this.desc + '\n\n' +

        str.help_usage + this.prefix + ' ' + str.help_command + '\n\n' +

        str.help_cmd_list + '\n\n'
      ;

    // Command list
    var data = [];
    for (var i in this.commands) {
      data.push({
        'Command': i,
        'Description': this.commands[i].desc
      });
    }

    r +=
      '```' + printTable(data) + '```\n\n' +
      str.help_further_help + this.prefix + ' ' + str.help_command + ' --help'
    ;

    return r;
  }
}

class Command extends Clapp.Command {
  constructor(name, fn, desc = '', args = [], flags = []) {
    super(name, fn, desc, args, flags);
  }

  _getHelp(app) {
    var r = str.help_usage + ' ' + app.prefix + ' ' + this.name;

    // Add every argument to the usage (Only if there are arguments)
    if (Object.keys(this.args).length > 0) {
      var args_data = [];
      for (var i in this.args) {
        r += this.args[i].required ? ' (' + i + ')' : ' [' + i + ']';
        args_data.push({
          'Argument': i,
          'Description': typeof this.args[i].desc !== 'undefined' ?
            this.args[i].desc : '',
          'Default': typeof this.args[i].default !== 'undefined' ?
            this.args[i].default : ''
        });
      }
    }

    r += '\n' + this.desc;

    if (Object.keys(this.args).length > 0)
      r += '\n\n' + str.help_av_args + ':\n\n```' + printTable(args_data) + '```';

    // Add every flag, only if there are flags to add
    if (Object.keys(this.flags).length > 0) {
      var flags_data = [];
      for (i in this.flags) {
        flags_data.push({
          'Option': (typeof this.flags[i].alias !== 'undefined' ?
          '-' + this.flags[i].alias + ', ' : '') + '--' + i,
          'Description': typeof this.flags[i].desc !== 'undefined' ?
            this.flags[i].desc : '',
          'Default': typeof this.flags[i].default !== 'undefined' ?
            this.flags[i].default : ''
        });
      }

      r += '\n\n' + str.help_av_options + ':\n\n```' + printTable(flags_data) + '```';
    }

    if (Object.keys(this.args).length > 0)
      r += '\n\n' + str.help_args_required_optional;

    return r;
  }
}

module.exports = {
  App: App,
  Command: Command
};
