var React = require('react');
var Firebase = require('firebase');

var rootUrl = "https://radiant-torch-3052.firebaseio.com/";

module.exports = React.createClass({
  componentWillMount: function(){
    this.fb = new Firebase(rootUrl + 'items/'+this.props.item.key);
  },

  getInitialState: function(){
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },

  render: function(){
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          onChange={this.handleDoneChange}
          checked={this.state.done}
          />
      </span>
      <input type="text"
        disabled={this.state.done}
        className="form-control"
        onChange={this.handleTextChange}
        value={this.state.text}
        />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          className="btn btn-default"
          onClick={this.handleDeleteClick}
        >
          Delete
        </button>
      </span>
    </div>
  },

  changesButtons: function(){
    if(!this.state.textChanged){
      return null;
    } else {
      return [
        <button
          className="btn btn-default"
          onClick={this.handleSaveClick}
        >Save</button>,
        <button
          className="btn btn-default"
          onClick={this.handleUndoClick}
        >Undo</button>
      ]
    }
  },

  handleDoneChange: function(event){
    var update = {done: event.target.checked};
    this.setState(update);
    this.fb.update(update);
  },

  handleDeleteClick: function(event){
    this.fb.remove();
  },

  handleTextChange: function(event){
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },

  handleUndoClick: function(event){
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },

  handleSaveClick: function(event){
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  }

});
