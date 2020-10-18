import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchWatchedQueue(action) {
    console.log('fetchWatchedQueue got an action', action);
    let response = yield axios ({
        method: 'GET',
        url: `/api/queue/watched`
    });
    console.log('GET / queue', response);
    yield put ({
        type: 'SET_WATCHED',
        payload: response.data
    })
}

function* watchedSaga() {
  yield takeLatest('FETCH_WATCHED', fetchWatchedQueue);
}

export default watchedSaga;