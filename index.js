// Configs
require("dotenv").config();

// External modules
const yargs = require("yargs");

// Internal modules
const habits = require("./habits");

yargs.command({
  command: "start-day",
  describe: "Start the awesome day",
  handler: () => {
    habits.startDay();
  },
});

yargs.command({
  command: "end-day",
  describe: "End the awesome day",
  handler: () => {
    habits.endDay();
  },
});

yargs.command({
  command: "help",
  describe: "Show all available commands",
  handler: () => {
    yargs.showHelp();
  },
});

yargs.fail((msg, err, yargs) => {
  if (err) throw err; // preserve stack
  console.error(`Invalid command: ${msg}`);
  yargs.showHelp();
});

yargs.parse();
