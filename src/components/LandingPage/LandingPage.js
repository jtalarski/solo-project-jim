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
              This is the place to keep track of all the movies and series you watch! 
            </p>
            <p>
              Even better you can keep up with your friends' viewing.
            </p>
          
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
