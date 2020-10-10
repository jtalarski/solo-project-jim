import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
//import mapStoreToProps from '../../redux/mapStoreToProps';

class UserPage extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render(props) {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
        <p>Your ID is: {this.props.user.id}</p>
        <LogOutButton className="log-in" />
      </div>
    )
  }
};

// this allows us to use <App /> in index.js
const mapStoreToProps = (reduxState) => ({
  user: reduxState.user
});
export default connect(mapStoreToProps)(UserPage);