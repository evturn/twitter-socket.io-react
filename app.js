/** @jsx React.DOM */

var React = require('react');
var TweetsApp = require('./components/TweetsApp.react');

// Grab initial state from server
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML)

// Render components
React.renderComponent(
  <TweetsApp tweets={initialState}/>,
  document.getElementById('react-app')
);