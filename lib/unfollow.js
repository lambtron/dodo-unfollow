
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var Twitter = require('simple-twitter');

/**
 * Expose `Unfollow`.
 */

module.exports = Unfollow;

/**
 * Initialize a new `Unfollow`.
 */

function Unfollow(userId, token, secret) {
  if (!(this instanceof Unfollow)) return new Unfollow(userId, token, secret);
  this.twitter = getAuthenticatedTwitter(token, secret);
  this.userId = userId;
}

/**
 *
 */

Unfollow.prototype.start = function *start() {
  var dodoListId = yield getDodoListId(this.userId, this.twitter);
  var members = yield getMembers(dodoListId, this.twitter);
  yield removeMembers(members, dodoListId, this.twitter);
};

/**
 * Private helper function to return authenticated twitter client.
 *
 * @param {String} token
 * @param {String} secret
 *
 * @return {Object} twitter
 */

function getAuthenticatedTwitter(token, secret) {
  return thunkify(new Twitter(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    token,
    secret
  ));
};

/**
 * Private helper function to get `Dodo` list id.
 *
 * @param {String} userId
 * @param {Object} twitter
 *
 * @return {Number}
 */

function *getDodoListId(userId, twitter) {
  var res = yield twitter.get('lists/ownerships', '?user_id=' + userId);
  var lists = JSON.parse(res).lists;
  for (var i = 0; i < lists.length; i++) {
    if (~lists[i].name.indexOf('dodo'))
      return lists[i].id;
  }
  throw 'Dodo list not found.';
};

/**
 * Private helper function to get members in list.
 *
 * @param {Number} id
 * @param {Object} twitter
 *
 * @return {Array}
 */

function *getMembers(id, twitter) {
  var params = '?list_id=' + id + '&skip_status=true&include_entities=false';
  var res = yield twitter.get('lists/members', params);
  return JSON.parse(res).users;
};

/**
 * Private helper function to unfollow and remove members in list.
 *
 * @param {Array} members
 * @param {String} listId
 * @param {Object} twitter
 */

function *removeMembers(members, listId, twitter) {
  for (var i = 0; i < members.length; i++) {
    yield twitter.post('friendships/destroy', { user_id: members[i].id });
    yield twitter.post('lists/members/destroy', { list_id: listId, user_id: members[i].id });
  }
};
