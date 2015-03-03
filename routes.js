var JSX       = require('node-jsx').install();
var React     = require('react');
var TweetsApp = require('./components/TweetsApp.react');
var Tweet     = require('./models/Tweet');

module.exports = {

  index: function(req, res) {
   
    // Schema method to get tweets from DB
    Tweet.getTweets(0,0, function(tweets, pages) {

      // Render React to a string with tweets
      var markup = React.renderComponentToString(
        TweetsApp({
          tweets: tweets
        })
      );

      // Render Home with React markup and browser state
      res.render('home', {
        markup: markup,
        state: JSON.stringify(tweets) 
      });

    });
  },

  page: function(req, res) {

    // Fetch tweets
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {
      res.send(tweets);
    });
  }

};