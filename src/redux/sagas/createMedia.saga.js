import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addMedia(action) {
    console.log('deleteQueue got an action', action);
    yield axios ({
        method: 'POST',
        url: '/api/queue',
        data: action.payload
    });
    console.log('GET / queue');
    yield put ({
        type: 'FETCH_QUEUE',
    })
}

function* createMediaSaga() {
  yield takeLatest('ADD_MEDIA', addMedia);
}

export default createMediaSaga;