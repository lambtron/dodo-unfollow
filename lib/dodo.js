
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
  if (!(this instanceof Dodo)) return new Dodo();
  this.twitter = {};
}

/**
 * Authenticate twitter client.
 *
 * @param {String} token
 * @param {String} secret
 */

Dodo.prototype.authenticateUser = function *authenticateUser(token, secret) {
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
  return;
};

/**
 * Get `Dodo` list id.
 *
 * @param {String} userId
 *
 * @return {Number}
 */

Dodo.prototype.getDodoListId = function *getDodoListId(userId) {
  var res = yield this.twitter.get('lists/ownerships', '?user_id=' + userId);
  var lists = JSON.parse(res).lists;
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
  var params = '?list_id=' + id + '&skip_status=true&include_entities=false';
  var res = yield this.twitter.get('lists/members', params);
  return JSON.parse(res).users;
};

/**
 * Unfollow members in list.
 *
 * @param {Array} members
 * @param {String} listId
 */

Dodo.prototype.removeMembers = function *removeMembers(members, listId) {
  for (var i = 0; i < members.length; i++) {
    yield this.twitter.post('friendships/destroy', { user_id: members[i].id });
    yield this.twitter.post('lists/members/destroy',
      { list_id: listId, user_id: members[i].id });
  }
};

/**
 * Destroy twitter client.
 */

Dodo.prototype.destroy = function *destroy() {
  this.twitter = {};
  return;
};
