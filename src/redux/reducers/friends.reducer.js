const friendsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FRIENDSQ':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default friendsReducer;