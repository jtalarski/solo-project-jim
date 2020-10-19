import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import './SearchPage.css'

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

addToQueue = () => {
  this.props.dispatch({
    type: 'ADD_MEDIA',
    payload: this.state.newMedia
  })
}
    
fetchFriendsQ = () => {
  console.log('in fetchFriendsQ');
  this.props.dispatch({
    type: 'FETCH_FRIENDSQ'
  });
}

handleChangeFor = (event, propertyName) => {
  this.setState({
    newMedia: {
      ...this.state.newMedia,
      [propertyName]: event.target.value
    }
  })
}

addIt = (event) => {
  console.log('in addIt', event.target.id);
  this.props.dispatch ({
    type: "ADD_REC",
    payload: {
      id: event.target.id}
  });
  this.fetchFriendsQ();
}

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
      <h3>Want to add something new to your queue?</h3>  
      <form>
        <input
        placeholder='Title'
        type='text'
        // value={this.state.newMedia.title}
        onChange={(event) => this.handleChangeFor(event, 'title')}
      />
      <input
        placeholder='Plot'
        type='text'
        // value={this.state.newMedia.plot}
        onChange={(event) => this.handleChangeFor(event, 'plot')}
      />
      <select name="type" onClick={this.typeSet}>
        <option selected disabled>Movie or Series</option>
        <option value="Movie">Movie</option>
        <option value="Series">Series</option>
      </select>

      <button onClick={this.addToQueue}>Add To My Queue!</button>
      </form>
      
      <h3>Consider something that your friends are watching</h3>
      <table>
        <thead>
          <tr>
            <th className="thLeft">Title</th>
            <th className="thLeft">Plot</th>
            <th>Type</th>
            <th>Add To My Queue!</th>
          </tr>
          </thead>
          {this.props.friends.map (media =>
            <tr>
              <td>{media.title}</td>
              <td>{media.description}</td>
              <td>{media.type}</td>
              <td><button id={media.movie_table_id} onClick={this.addIt}>Add It!</button></td>
            </tr>)}
        
      </table>




      
      
  

      </div>
    )
  }
}
const mapStateToProp = reduxState => ({
  search: reduxState.search,
  user: reduxState.user,
  newMedia: reduxState.newMedia,
  friends: reduxState.friends
});
export default connect(mapStateToProp)(withRouter(SearchPage));