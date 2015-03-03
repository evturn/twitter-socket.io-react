var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	twid 	 		: String,
	active 		: Boolean,
	author 		: String,
	avatar 		: String,
	body	 		: String,
	date	 		: Data,
	screename : String	
});

schema.statics.getTweets = function(page, skip, callback) {
	
	// Return tweets from DB
	var tweets = [];
			start	 = (page * 10) + (skip * 1);

	// Query the DB
  Tweet.find({},'twid active author avatar body date screenname',{skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err,docs){

    if(!err) {
      tweets = docs;
      tweets.forEach(function(tweet){
        tweet.active = true;
      });
    }
    callback(tweets);
  });

};

// Returns a Tweet model based on schema
module.exports = Tweet = mongoose.model('Tweet', schema);