import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './ManageQueuePage.css';
import swal from 'sweetalert';

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

 // fetches list of media from auth's user's
 // queue with status of watched upon component
 // refresh. Dispatch answered by watchedSaga.
 // Kicks off GET request using queueRoute
fetchWatched= ()=>
this.props.dispatch ({
  type: 'FETCH_WATCHED'
})

// fetches list of media from auth's user's
// queue with status of watching or in queue 
// upon component refresh. Dispatch answered
// by queueSaga. Kicks off GET request using
// watchedQueue route
fetchQueue=()=> {
  console.log('In fetchQueue');
  this.props.dispatch({
    type: 'FETCH_QUEUE'
  });
}
// Sends dispatch answered by updateSaga. Will
//lead to POST request through queueRouter. 
// Dispatch will lead to change in friend_movie
// table. Kicks of page refresh that will display
// updated lists of movies in queue. 
statusUpdate= (event) => {
  console.log('in statusUpdate', event.target.id, event.target.value);
  this.props.dispatch({
    type: "CHANGE_STATUS",
    payload: {
      idToChange: event.target.id,
      statusUpdate: event.target.value
    }
  });
  swal("status updated","", "success");
  this.fetchQueue();
  this.fetchWatched();
}
// Sends dispatch that will be answered by
// the deleteQueueSaga. Will lead to a 
// DELETE request through QUEUE router. 
deleteMedia=(event) => {
  console.log('in deleteMedia', event.target.id);
  this.props.dispatch({
    type: 'DELETE_QUEUE',
    payload: event.target.id
  });
  swal("Going, going gone!","Media removed from queue", "success");
}

  render() {
    return (
      <div >
        <h2 className="title">Manage Your Active Queue, {this.props.user.first_name}</h2>
      <table className="queueTable queueShadow">
          <thead>
            <th>Title</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Remove</th>
          </thead>
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
      <table className="queueTable queueShadow">
        <thead>
          <th>Title</th>
          <th>Status</th>
          <th>Back To Queue</th>
          <th>Delete</th>
        </thead>
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

const mapStateToProps = reduxState => ({
  queue: reduxState.queue,
  user: reduxState.user,
  watched: reduxState.watched
});

export default connect(mapStateToProps)(withRouter(ManageQueue));