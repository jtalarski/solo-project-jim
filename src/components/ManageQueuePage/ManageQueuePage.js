import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
//import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ManageQueue extends React.Component {
 componentDidMount () {
   this.fetchQueue();
 }
 
 
  state = {
    heading: 'Manage Queue',
  };

fetchQueue=()=> {
  console.log('In fetchQueue');
  this.props.dispatch({
    type: 'FETCH_QUEUE'
  });
}

statusUpdate=() => {
  console.log('in statusUpdate')
}

deleteMedia=(event) => {
  console.log('in deleteMedia', event.target.id);
  this.props.dispatch({
    type: 'DELETE_QUEUE',
    payload: event.target.id
  })
}

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        {/* <pre>{JSON.stringify(this.props.queue)}</pre> */}
        <table></table>
        {this.props.queue.map(movie =>
          <li key={movie.fm_table_id}>
            Title:{movie.title}<br></br>
            Internal ID: {movie.fm_table_id}<br></br>
            Status:{movie.status}
            <button id={movie.fm_table_id} onClick={this.statusUpdate}>Status Update</button>
            <button id={movie.fm_table_id} onClick={this.deleteMedia}>Delete</button>
          </li>
          )}
      </div>
    );
  }
}

const mapStateToProp = reduxState => ({
  queue: reduxState.queue,
  user: reduxState.user
});

export default connect(mapStateToProp)(withRouter(ManageQueue));