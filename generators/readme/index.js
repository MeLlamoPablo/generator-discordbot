"use strict";

const Generator = require("yeoman-generator")
    , _         = require("lodash");

module.exports = class ReadmeGenerator extends Generator {

  constructor(args, opts) {

    super(args, opts);

    this.option("generateInto", {
      type: String,
      required: false,
      defaults: "",
      desc: "Relocate the location of the generated files."
    });

    this.option("name", {
      type: String,
      required: true,
      desc: "Project name"
    });

    this.option("description", {
      type: String,
      required: true,
      desc: "Project description"
    });

    this.option("githubAccount", {
      type: String,
      required: true,
      desc: "User github account"
    });

    this.option("authorName", {
      type: String,
      required: true,
      desc: "Author name"
    });

    this.option("authorUrl", {
      type: String,
      required: true,
      desc: "Author url"
    });

    this.option("coveralls", {
      type: Boolean,
      required: true,
      desc: "Include coveralls badge"
    });

  }

  writing() {

    const pkg = this.fs.readJSON(
      this.destinationPath(this.options.generateInto, "package.json"), {}
    );

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath(this.options.generateInto, "README.md"),
      {
        projectName: this.options.name,
        safeProjectName: _.camelCase(this.options.name),
        description: this.options.description,
        githubAccount: this.options.githubAccount,
        author: {
          name: this.options.authorName,
          url: this.options.authorUrl
        },
        license: pkg.license,
        includeCoveralls: this.options.coveralls,
        content: this.options.content
      }
    );

  }

}
