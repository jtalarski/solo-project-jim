import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Will be fired by ADD_MEDIA dispatch action from
// kicked off by addToQueue function in searchPage.js
// next stop in flow is router.post in queue.router.js
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