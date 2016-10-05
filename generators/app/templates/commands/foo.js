var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command(
  'foo', // Command name
  function(argv, context) {
    // This output will be redirected to your app's onReply function
    return 'Foo was executed!' + ' The value of testarg is: ' + argv.args.testarg +
      (argv.flags.testflag ? ' testflag was passed!' : '');
  },
  'does foo things', // Command description
  // Args
  [
    {
      name: 'testarg',
      desc: 'A test argument',
      type: 'string',
      required: false,
      default: 'testarg isn\'t defined'
    }
  ],
  // Flags
  [
    {
      name: 'testflag',
      desc: 'A test flag',
      alias: 't',
      type: 'boolean',
      default: false
    }
  ]
);
