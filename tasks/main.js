
/**
 * Module dependencies.
 */

var Users = require('../lib/users');
var Dodo = require('../lib/dodo');
var co = require('co');

/**
 * Main function.
 */

function *main() {
  console.log('hi, users:');
  var users = yield Users.find({});
  console.log(users);
  for (var i = 0; i < users.length; i++) {
    var dodo = new Dodo(users[i].user_id, users[i].token, users[i].secret);
    dodo.unfollow();
  }
}

/**
 * Expose `main`.
 */

module.exports = co.wrap(main);
