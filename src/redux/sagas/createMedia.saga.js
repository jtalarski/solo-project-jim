import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addMedia(action) {
    console.log('add media got an action', action);
    yield axios ({
        method: 'POST',
        url: '/api/queue',
        data: action.payload
    });
    console.log('POST / queue');
    yield put ({
        type: 'FETCH_QUEUE',
    })
}

function* addMediaSaga() {
  yield takeLatest('ADD_MEDIA', addMedia);
}



export default addMediaSaga;