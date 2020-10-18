import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchFriendsQ(action) {
    console.log('fetchFriendsQ got an action', action);
    let response = yield axios ({
        method: 'GET',
        url: `/api/queue/friends`
    });
    console.log('GET / queue', response);
    yield put ({
        type: 'SET_FRIENDSQ',
        payload: response.data
    })
}

function* friendsSaga() {
  yield takeLatest('FETCH_FRIENDSQ', fetchFriendsQ);
}

export default friendsSaga;