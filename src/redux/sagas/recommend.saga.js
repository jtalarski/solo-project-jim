import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addRec(action) {
    console.log('addRec got an action', action);
    let response = yield axios ({
        method: 'POST',
        url: `/api/queue/friends`,
        data: action.payload
    });
    console.log('POST / addRec queue', response);
    yield put ({
        type: 'FETCH_FRIENDSQ',
    })
}

function* recommendSaga() {
  yield takeLatest('ADD_REC', addRec);
}

export default recommendSaga;