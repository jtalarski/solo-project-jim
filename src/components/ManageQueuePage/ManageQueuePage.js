import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './ManageQueuePage.css';
//import WatchedPage from '../WatchedPage/WatchedPage'
//import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ManageQueue extends React.Component {
 componentDidMount () {
   this.fetchQueue();
   this.fetchWatched()
 }
 
 
  state = {
    mediaStatus: {
      friend_movie_id: '',
      newStatus:  ''
    }
  };
fetchWatched= ()=>
this.props.dispatch ({
  type: 'FETCH_WATCHED'
})

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
  });
  this.fetchQueue();
  this.fetchWatched();
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
        <h2 className="title">Manage Your Active Queue, {this.props.user.first_name}</h2>
      <table className="queueTable">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Delete</th>
          </tr>
          {this.props.queue.map (movie =>
            <tr key={movie.fm_table_id}>
              <td>{movie.title}</td>
              <td>{movie.status}</td>
              <td className="centerTD">
                <select id={movie.fm_table_id} name="status" onChange={this.statusUpdate}>
                  <option selected disabled>Choose Status</option>
                  <option value="In Queue">In Queue</option>
                  <option value="Watched">Watched</option>
                  <option value="Watching">Watching</option>
                </select>
              </td>
              <td><button id={movie.fm_table_id} onClick={this.deleteMedia}>Delete</button></td>
            </tr>)}
      </table>
      <h2 className="title">Here is what you already watched</h2>
      <table>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Back To Queue</th>
          <th>Delete</th>
        </tr>
        {this.props.watched.map (watched =>
          <tr>
            <td>{watched.title}</td>
            <td>{watched.status}</td>
            <td className="centerTD">
              <button id={watched.fm_table_id} value="In Queue" onClick={this.statusUpdate}>Back To Queue</button>
            </td>
            <td><button id={watched.fm_table_id} onClick={this.deleteMedia}>Delete</button></td>
          </tr>)}

      </table>
       
      </div>
    );
  }
}

const mapStateToProp = reduxState => ({
  queue: reduxState.queue,
  user: reduxState.user,
  watched: reduxState.watched
});

export default connect(mapStateToProp)(withRouter(ManageQueue));