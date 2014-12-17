
/**
 * Module dependencies.
 */

var main = require('./tasks/main.js');
var CronJob = require('cron').CronJob;

/**
 * Initiate monthly Cronjob.
 * Job will run at 12:00am on the first every month.
 */

new CronJob({
  cronTime: "0 0 1 * *",
  onTick: main(),
  start: true,
  timeZone: "America/Los_Angeles"
});
