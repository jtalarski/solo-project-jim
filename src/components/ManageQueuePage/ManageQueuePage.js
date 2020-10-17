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
    mediaStatus: {
      friend_movie_id: '',
      newStatus:  ''
    }
  };

fetchQueue=()=> {
  console.log('In fetchQueue');
  this.props.dispatch({
    type: 'FETCH_QUEUE'
  });
}

statusUpdate= (event) => {
  console.log('in statusUpdate', event.target.id, event.target.value);
  this.props.dispatch({
    type: "CHANGE_STATUS",
    payload: {
      idToChange: event.target.id,
      statusUpdate: event.target.value
    }
  })
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
        <h2>Manage Queue</h2>
        {/* <pre>{JSON.stringify(this.props.queue)}</pre> */}
        <table></table>
        {this.props.queue.map(movie =>
          <li key={movie.fm_table_id}>
            Title:  {movie.title}<br></br>
            Internal ID: {movie.fm_table_id}<br></br>
            Status:  {movie.status}<br></br>
            {/* <button id={movie.fm_table_id} onClick={this.statusUpdate}>Status Update</button> */}
            Set New Status:  <select id={movie.fm_table_id} name="status" onChange={this.statusUpdate}>
              <option>New Status</option>
              <option value="Watched">Watched</option>
              <option value="Watching">Watching</option>
            </select><br></br>
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