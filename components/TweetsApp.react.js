module.exports = TweetsApp = React.createClass({

  addTweet: function(tweet){

    // Current application state
    var updated = this.state.tweets;

    // Increment unread count
    var count = this.state.count + 1;

    // Increment skip count
    var skip = this.state.skip + 1;

    // Add tweet to the beginning of tweets array
    updated.unshift(tweet);

    // Set application state
    this.setState({tweets: updated, count: count, skip: skip});

  },

  showNewTweets: function(){

    // Current application state
    var updated = this.state.tweets;

    // Mark tweets active
    updated.forEach(function(tweet){
      tweet.active = true;
    });

    // Set application state (active tweets + reset unread count)
    this.setState({tweets: updated, count: 0});

  },

  getPage: function(page){
    var request = new XMLHttpRequest(), self = this;
    request.open('GET', 'page/' + page + "/" + this.state.skip, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        self.loadPagedTweets(JSON.parse(request.responseText));
      } else {
        self.setState({paging: false, done: true});
      }
    };
    request.send();
  },

  checkWindowScroll: function(){
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var s = document.body.scrollTop;
    var scrolled = (h + s) > document.body.offsetHeight;

    if(scrolled && !this.state.paging && !this.state.done) {
      this.setState({paging: true, page: this.state.page + 1});
      this.getPage(this.state.page);
    }
  },

  // Set initial component state
  getInitialState: function(props){
    props = props || this.props;

    // Set initial application state using props
    return {
      tweets: props.tweets,
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false
    };

  },

  componentWillReceiveProps: function(newProps, oldProps){
    this.setState(this.getInitialState(newProps));
  },

  // Called on client after component rendering
  componentDidMount: function(){
    var self = this;
    var socket = io.connect();

    // On tweet event emission add tweet to queue
    socket.on('tweet', function (data) {
      self.addTweet(data);
    });

    // Infinite scroll
    window.addEventListener('scroll', this.checkWindowScroll);
  },

  render: function() {
    return (
      <div className="tweets-app">
        <Tweets tweets={this.state.tweets} />
        <Loader paging={this.state.paging}/>
        <NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets}/>
      </div>
    )
  }
});