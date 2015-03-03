var Tweet = require('../model/Tweet');

module.exports = function(stream, io) {

	// When tweets are received
	stream.on('data', function(data) {

		// Construct Tweet Object
		var tweet = {
			twid: data['id'],
			active: false,
			author: data['user']['name'],
			avatar: data['user']['profile_image_url'],
      body: data['text'],
      date: data['created_at'],
      screenname: data['user']['screen_name']
		}

	});

};