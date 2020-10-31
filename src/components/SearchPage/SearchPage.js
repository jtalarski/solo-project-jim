import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './SearchPage.css';
import swal from 'sweetalert';

class SearchPage extends React.Component {
componentDidMount () {
  this.fetchFriendsQ();
}



  state = {
  newMedia: {
    user: this.props.user.id,
    title: '',
    plot: '',
    type: ''
  }
}

// Kicks off createMedia.saga.js
addToQueue = () => {
  this.props.dispatch({
    type: 'ADD_MEDIA',
    payload: this.state.newMedia
  });
  this.fetchFriendsQ()
  swal("Media added to your queue","", "success");
}
 
// Kicks off friends.saga.js
fetchFriendsQ = () => {
  console.log('in fetchFriendsQ');
  this.props.dispatch({
    type: 'FETCH_FRIENDSQ'
  });
}

// Changes state which is then sent to the 
// createMedia.saga via the addToQueue function
// on this page
handleChangeFor = (event, propertyName) => {
  this.setState({
    newMedia: {
      ...this.state.newMedia,
      [propertyName]: event.target.value
    }
  })
}


// Kicks off the recommend.saga.js
addIt = (event) => {
  console.log('in addIt', event.target.id);
  this.props.dispatch ({
    type: "ADD_REC",
    payload: {
      id: event.target.id}
  });
  swal("Media added to your queue","", "success");
  this.fetchFriendsQ();
}


// Sets the type of media, movie or series in state
// state is added to dispatch payload in addToQueue
// function
typeSet = (event) => {
  this.setState({
    newMedia: {
      ...this.state.newMedia,
      type: event.target.value
    }
  })
}

  render() {
    console.log('this user', this.props.user.id)
    
    return (
      <div>
      {/* <pre>{JSON.stringify(this.props.friends, null, 2)}</pre> */}
      <div className='addBackground queueShadow'>
      <h1>Want to add something new to your queue?</h1>  
      <form>
        <input
        placeholder='Title'
        type='text'
        // value={this.state.newMedia.title}
        onChange={(event) => this.handleChangeFor(event, 'title')}
      /><br></br>
      
      <select name="type" onClick={this.typeSet}>
        <option selected disabled>Movie or Series</option>
        <option value="Movie">Movie</option>
        <option value="Series">Series</option>
      </select> <br></br>
      
      <textarea
        placeholder='Plot'
        type='text'
        // value={this.state.newMedia.plot}
        onChange={(event) => this.handleChangeFor(event, 'plot')}
      /><br></br>
      <button onClick={this.addToQueue} className="addBtn">Add To My Queue!</button>
      </form>
      </div>
      <h2>Consider something that your friends are watching</h2>
      <table className="queueShadow">
        <thead>
          <tr>
            <th className="thLeft">Poster</th>
            <th className="thLeft">Title</th>
            <th className="thLeft">Plot</th>
            <th>Type</th>
            <th>Add To My Queue!</th>
          </tr>
          </thead>
          <tbody>
          {this.props.friends.map (media =>
            <tr key={media.movie_table_id}>
              <td><img src={media.poster_url} alt="poster"></img></td>
              <td>{media.title}</td>
              <td>{media.description}</td>
              <td>{media.type}</td>
              <td><button className="addBtn" id={media.movie_table_id} onClick={this.addIt}>Add It!</button></td>
            </tr>)}
            </tbody>
      </table>




      
      
  

      </div>
    )
  }
}
const mapStateToProps = reduxState => ({
  search: reduxState.search,
  user: reduxState.user,
  newMedia: reduxState.newMedia,
  friends: reduxState.friends
});
export default connect(mapStateToProps)(withRouter(SearchPage));