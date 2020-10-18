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
      <pre>{JSON.stringify(this.props.friends)}</pre>
      
      <p>What media would you like to add to your queue?</p>  
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
      {/* <input
        placeholder='Type: Movie or Series'
        type='text'
        //value={this.state.newMedia.type}
        onChange={(event) => this.handleChangeFor(event, 'type')}
      /> */}
      <select name="type" onClick={this.typeSet}>
        <option selected disabled>Movie or Series</option>
        <option value="Movie">Movie</option>
        <option value="Series">Series</option>
      </select>

      <button onClick={this.addToQueue}>Add To My Queue!</button>
      
  

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