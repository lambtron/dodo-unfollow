
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
  var users = yield Users.find({});
  var dodo = new Dodo();
  for (var i = 0; i < users.length; i++) {
    yield dodo.authenticateUser(users[i].token, users[i].secret);
    var dodoListId = yield dodo.getDodoListId(users[i].user_id);
    var members = yield dodo.getMembers(dodoListId);
    yield dodo.unfollowMembersInList(members);
    dodo.destroy();
  }
}

/**
 * Initiate `main`.
 */

module.exports = co.wrap(main);
