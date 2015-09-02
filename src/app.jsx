var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var rootUrl = "https://radiant-torch-3052.firebaseio.com/";

var Hello = React.createClass({
  mixins: [ReactFire],

  componentWillMount: function(){
    this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
  },

  render: function() {
    console.log(this.state);
    
    return <h1 className="red">
      Hello - ToDo!
    </h1>
  }
});

var element = React.createElement(Hello, {});
React.render(element, document.querySelector('.container'));
