import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//  Will be fired on FETCH_QUEUE action time from 
// fethcQueue function in ManageQueuePage.js
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