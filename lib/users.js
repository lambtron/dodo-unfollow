
/**
 * Module dependencies.
 */

var monk = require('monk');
var wrap = require('co-monk');
var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost/dodo';
var db = monk(mongo);
var Users = wrap(db.get('users'));

/**
 * Expose `Users`.
 */

module.exports = Users;
