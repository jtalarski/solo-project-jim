import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'


class SearchPage extends React.Component {
state = {
  search: ""
}

searchTerm = (event) => {
  this.setState({
    search: event.target.value
  })
}

hitIt = () => {
  this.props.dispatch({
    type: 'FETCH_MOVIE',
    payload: this.state.search
  });
  
}


addToQueue = () =>
    console.log('in addToQueue');



  render() {
    return (
      <div>
        <p>Search and Add a Movie</p>
        <input
        type="text"
        placeholder="Enter movie title"
        onChange={this.searchTerm}
        />
      <button onClick={this.hitIt}>Search</button><br></br>

      <>
      
      <pre>{JSON.stringify(this.props.search, null, 2)}</pre>

      <>
      <p>Is this the movie you are looking for?</p>
      {this.props.search.Title}<br></br>
      {this.props.search.Plot}<br></br>
      <button onClick={this.addToQueue}>Yes! Add Movie to My Queue</button>
      </>

{/*    ## Cannot get map of search results to work. Moving
       ## to using Title search versus wide open search      
        
        {this.props.search.map((movie,i) =>
            <li key={movie.imdbID}>
                {movie.Title}
            </li>)} */}

      </>

      </div>
    )
  }
}
const mapStateToProp = reduxState => ({
  search: reduxState.search
});
export default connect(mapStateToProp)(withRouter(SearchPage));