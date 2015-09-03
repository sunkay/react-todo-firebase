var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require("./header");

var rootUrl = "https://radiant-torch-3052.firebaseio.com/";

var Hello = React.createClass({
  mixins: [ReactFire],

  componentWillMount: function(){
    this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
  },

  render: function() {
    //console.log(this.state);

    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items}/>
      </div>
    </div>
  }
});

var element = React.createElement(Hello, {});
React.render(element, document.querySelector('.container'));
