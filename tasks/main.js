
/**
 * Module dependencies.
 */

var Users = require('../lib/users');
var Unfollow = require('../lib/unfollow');
var co = require('co');

/**
 * Main function.
 */

function *main() {
  var users = yield Users.find({});
  for (var i = 0; i < users.length; i++) {
    var unfollow = new Unfollow(users[i].user_id, users[i].token, users[i].secret);
    unfollow.start();
    // Remove users.
    var dodoListId = yield dodo.getDodoListId(users[i].user_id);
    var members = yield dodo.getMembers(dodoListId);
    yield dodo.removeMembers(members, dodoListId);
  }
  dodo = null;
}

/**
 * Expose `main`.
 */

module.exports = co.wrap(main);
