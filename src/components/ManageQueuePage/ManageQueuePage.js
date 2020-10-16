import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
//import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ManageQueue extends React.Component {
 componentDidMount () {
   this.fetchQueue();
 }
 
 
  state = {
    heading: 'Manage Queue',
  };

fetchQueue=()=> {
  console.log('In fetchQueue');
  this.props.dispatch({
    type: 'FETCH_QUEUE'
  });
}

statusUpdate=() => {
  console.log('in statusUpdate')
}

deleteMedia=() => {
  console.log('in deleteMedia');
}

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        {/* <pre>{JSON.stringify(this.props.queue)}</pre> */}
        <table></table>
        {this.props.queue.map(movie =>
          <li key={movie.fm_table_id}>Title:{movie.title}<br></br>Status:{movie.status}<button onClick={this.statusUpdate}>Status Update</button><button onClick={this.deleteMedia}>Delete</button></li>)}
      </div>
    );
  }
}

const mapStateToProp = reduxState => ({
  queue: reduxState.queue
});

export default connect(mapStateToProp)(withRouter(ManageQueue));