import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'


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
      
      {JSON.stringify(this.props.search.Search, null ,2)}

      </>

      </div>
    )
  }
}
const mapStateToProp = reduxState => ({
  search: reduxState.search
});
export default connect(mapStateToProp)(withRouter(InfoPage));
