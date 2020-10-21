import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';



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
      
      <pre>{JSON.stringify(this.props.search, null ,2)}</pre>
      <table>
        <tr>
          <td><img src={this.props.search.Poster}></img></td>
          <td>{this.props.search.Title}</td>
          <td>{this.props.search.Plot}</td>
          <td><button>Add It</button></td>
        </tr>
      </table>
      
      
      
      </>

      </div>
    )
  }
}
const mapStateToProps = reduxState => ({
  search: reduxState.search
});
export default connect(mapStateToProps)(withRouter(InfoPage));
