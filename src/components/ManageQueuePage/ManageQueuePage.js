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
   this.props.dispatch ({
     type: 'FETCH_WATCHED'
   })
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
        <h2 className="title">Manage Your Active Queue, {this.props.user.first_name}</h2>
        {/* <pre>{JSON.stringify(this.props.queue)}</pre> */}
        {/* {this.props.queue.map(movie =>
          <li key={movie.fm_table_id}>
            Title:  {movie.title}<br></br>
            Internal ID: {movie.fm_table_id}<br></br>
            Status:  {movie.status}<br></br>
            Set New Status:  <select id={movie.fm_table_id} name="status" onChange={this.statusUpdate}>
              <option>New Status</option>
              <option value="Watched">Watched</option>
              <option value="Watching">Watching</option>
            </select><br></br>
            <button id={movie.fm_table_id} onClick={this.deleteMedia}>Delete</button>
          </li>
          )} */}
      <table className="queueTable">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Delete</th>
          </tr>
          {this.props.queue.map (movie =>
            <tr>
              <td>{movie.title}</td>
              <td>{movie.status}</td>
              <td className="centerTD">
                <select id={movie.fm_table_id} name="status" onChange={this.statusUpdate}>
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