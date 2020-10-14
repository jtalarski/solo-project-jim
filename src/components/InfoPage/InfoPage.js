import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

// const InfoPage = () => (
//   <div>
//     <p>
//       Shelf Page
//     </p>
//     <>
//     <input 
//     onChange={(event)=>this.handleChangeFor(event,'search')}>Search</input>
//     <button>Search</button>
//     </>
//   </div>
// );

// If you needed to add local state or other things,
// you can make it a class component like:


class InfoPage extends React.Component {
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


  render() {
    return (
      <div>
        <p>Info Page</p>
        <input
        type="text"
        placeholder="Enter movie title"
        onChange={this.searchTerm}
        />
      <button onClick={this.hitIt}>Search</button><br></br>

      <>
      
    {/* {JSON.stringify(this.props.search,null ,2)} */}

      {/* {this.props.search.map ( (movie,i) =>
        <li key={movie.id}>
          {movie.Title}
        </li>)} */}
      
      Title :{this.props.search.Title}<br></br>
      Plot: {this.props.search.Plot}<br></br>
      Poster: <img src={this.props.search.Poster} width="50px" height="75px"/><br></br>
      IMDb ID: {this.props.search.imdbID}
      
      {/* {this.props.reduxState.search} */}
      
      </>

      </div>
    )
  }
}
const mapStateToProp = reduxState => ({
  search: reduxState.search
});
export default connect(mapStateToProp)(withRouter(InfoPage));
