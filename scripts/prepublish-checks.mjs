#!/usr/bin/env zx

const packageJson = require("../package.json");
const boxen = require("boxen");
const dedent = require("dedent");

const name = packageJson.name;
const displayName = packageJson.storybook.displayName;

let exitCode = 0;
$.verbose = false;

/**
 * Check that README has been updated
 */
const readmeTestStrings =
  "# Storybook Addon Kit|Click the \\*\\*Use this template\\*\\* button to get started.|https://user-images.githubusercontent.com/42671/106809879-35b32000-663a-11eb-9cdc-89f178b5273f.gif";

if ((await $`cat README.md | grep -E ${readmeTestStrings}`.exitCode) == 0) {
  console.error(
    boxen(
      dedent`
        ${chalk.red.bold("README not updated")}

        ${chalk.red(dedent`You are using the default README.md file that comes with the addon kit.
        Please update it to provide info on what your addon does and how to use it.`)}
      `,
      { padding: 1, borderColor: "red" }
    )
  );

  exitCode = 1;
}

process.exit(exitCode);
