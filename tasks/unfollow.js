
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
  for (var i = 0; i < users.length; i++) {
    console.log('in for loop');
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

module.exports = co.wrap(main);
