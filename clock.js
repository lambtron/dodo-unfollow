
/**
 * Module dependencies.
 */

var unfollow = require('./lib/unfollow');
var CronJob = require('cron').CronJob;

/**
 * Initiate monthly Cronjob.
 * Job will run at 12:00am on the first every month.
 */

new CronJob({
  cronTime: "0 0 1 * *",
  onTick: unfollow(),
  start: true,
  timeZone: "America/Los_Angeles"
});
