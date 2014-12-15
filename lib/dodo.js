
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var Twitter = require('simple-twitter');

/**
 * Expose `Dodo`.
 */

module.exports = Dodo;

/**
 * Initialize a new `Dodo`.
 */

function Dodo() {
  this.twitter;
  this.isAuthenticated = false;
}

/**
 * Authenticate twitter client.
 *
 * @param {String} token
 * @param {String} secret
 */

Dodo.prototype.authenticateUser = function authenticateUser(token, secret) {
  var config = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: token,
    accessTokenSecret: secret
  };
  this.twitter = thunkify(new Twitter(
    config.consumerKey,
    config.consumerSecret,
    config.accessToken,
    config.accessTokenSecret
  ));
  this.isAuthenticated = true;
  console.log('authenticated user');
};

/**
 * Get `Dodo` list id.
 *
 * @param {String} userId
 *
 * @return {Number}
 */

Dodo.prototype.getDodoListId = function *getDodoListId(userId) {
  var res = yield this.twitter.get('lists/ownerships', { user_id: userId });
  var lists = res.lists;
  console.log(lists);
  for (var i = 0; i < lists.length; i++) {
    if (~lists[i].name.indexOf('dodo'))
      return lists[i].id;
  }
  throw 'Dodo list not found.';
};

/**
 * Get members in list.
 *
 * @param {Number} id
 *
 * @return {Array}
 */

Dodo.prototype.getMembersInList = function *getMembersInList(id) {
  var params = { list_id: id, skip_status: true, include_entities: false };
  var res = yield this.twitter.get('lists/members', params);
  console.log(res.users);
  return res.users;
};

/**
 * Unfollow members in list.
 *
 * @param {Array} members
 */

Dodo.prototype.unfollowMembersInList = function *unfollowMembersInList(members) {
  for (var i = 0; i < members.length; i++)
    yield unfollowMember(members[i].id);
};

/**
 * Destroy twitter client.
 */

Dodo.prototype.destroy = function *destroy() {
  delete this.twitter;
  this.isAuthenticated = false;
};

/**
 * Private function to unfollow one member.
 */

function *unfollowMember(userId) {
  console.log('unfollowing ' + userId);
  return yield this.twitter.post('friendships/destroy', {user_id: userId});
}
