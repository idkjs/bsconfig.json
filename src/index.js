#!/usr/bin/env node
const inquirer = require("inquirer");
const path = require('path');
const { writeFile, readdir, readFile } = require("fs").promises;

const configFiles = {};
const configFolderPath = path.resolve(__dirname, 'config');


(async () => {

  const files = await readdir(configFolderPath).catch(console.log);

  for (let i of files) {
    // framework name is situated between 2 dots eg- react between 2 '.'(s)
    const frameworkName = i.split('.')[1];
    configFiles[frameworkName] = path.join(configFolderPath, i);
  }

  const { framework } = await inquirer.prompt([
    {
      type: "list",
      message: "Pick the config you want:",
      name: "framework",
      choices: Object.keys(configFiles),
    }
  ]);

  const config = await readFile(configFiles[framework]).catch(console.log);
  const bsconfig = path.join(process.cwd(), 'bsconfig.json');


  await writeFile(bsconfig, config, 'utf8');

  console.log("bsconfig.json successfully created");
})()
