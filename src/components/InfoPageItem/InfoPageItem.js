import React, { Component } from 'react';
import { connect } from 'react-redux';
//import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class InfoPageItem extends Component {
  state = {
    heading: 'InfoPageItem',
  };

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.search)}</pre>
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
    queue: reduxState.queue,
    user: reduxState.user,
    watched: reduxState.watched,
    search: reduxState.search
  });
export default (InfoPageItem);