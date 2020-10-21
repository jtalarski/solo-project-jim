import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
//import mapStoreToProps from '../../redux/mapStoreToProps';

class UserPage extends Component {

  moveToAddQueue = () => {
    this.props.history.push('/addmovie')
  }
  moveToManageQueue = () => {
    this.props.history.push('/queue')
  }
  // this component doesn't do much to start, just renders some user info to the DOM
  render(props) {
    return (
      <div className="userCenter">
        <h1 id="welcome">Welcome to watchUwatch, {this.props.user.first_name}!</h1>
        {/* <p>Your ID is: {this.props.user.id}</p> */}
        <p className="tallPara">What would you like to do?</p>
        

          <button className="btn_sizeSm btnColor" onClick={this.moveToAddQueue}>Add To Queue</button>
          <button className="btn_sizeSm btnColor" onClick={this.moveToManageQueue}>Manage Queue</button><br></br>
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