import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <h2>Welecome to watchUwatch</h2>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <p>
              Deciding watch movie or series to stream next? Do your friends suggest
              more viewing options than you can remember? If you answered yes to either 
              questions in you are in the right place. watchUwatch will quickly become
              your hub for trackig your viewing pleasures. 
            </p>
            <img src="./seinfeld_vids.jpg"/>
          
          </div>
          <div className="grid-col grid-col_4">
          <center>
              <button className="btn marginbtm" onClick={this.onLogin}>
                Login
              </button>
            </center>
            <RegisterForm />

            
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
