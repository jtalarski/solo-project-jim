import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchQueue(action) {
    console.log('fetchQueue got an action', action);
    let response = yield axios ({
        method: 'GET',
        url: `/api/queue/`
    });
    console.log('GET / queue', response);
    yield put ({
        type: 'SET_QUEUE',
        payload: response.data
    })
}

function* queueSaga() {
  yield takeLatest('FETCH_QUEUE', fetchQueue);
}

export default queueSaga;