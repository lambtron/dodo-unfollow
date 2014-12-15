
/**
 * Module dependencies.
 */

var Users = require('../lib/users');
var Dodo = require('../lib/dodo');

/**
 * Main function.
 */

function *main() {
  var users = yield Users.find({});
  console.log(users);
  for (var i = 0; i < users.length; i++) {
    Dodo.authenticateUser(users[i].token, users[i].secret);
    var dodoListId = yield Dodo.getDodoListId(users[i].id);
    var members = yield Dodo.getMembersInList(dodoListId);
    console.log(members);
    yield Dodo.unfollowMembersInList(members);
    Dodo.destroy();
  }
}

/**
 * Initiate `main`.
 */

module.exports = main;
