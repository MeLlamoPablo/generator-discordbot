const Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
  name: "foo",
  desc: "does foo things",
  fn: (argv, context) => new Promise((resolve, reject) => {

    // This output will be redirected to your app's onReply function
    resolve(`Foo was executed! The value of testarg is: ${argv.args.testarg}.` +
      (argv.flags.testflag ? '\ntestflag was passed!' : ''));

  }),
  args: [
    {
      name: 'testarg',
      desc: 'A test argument',
      type: 'string',
      required: false,
      default: 'testarg isn\'t defined'
    }
  ],
  flags: [
    {
      name: 'testflag',
      desc: 'A test flag',
      alias: 't',
      type: 'boolean',
      default: false
    }
  ]
});
