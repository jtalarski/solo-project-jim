import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* deleteQueue(action) {
    console.log('deleteQueue got an action', action);
    yield axios ({
        method: 'DELETE',
        url: `/api/queue/${action.payload}`
    });
    console.log('GET / queue');
    yield put ({
        type: 'FETCH_QUEUE',
    })
}

function* deleteQueueSaga() {
  yield takeLatest('DELETE_QUEUE', deleteQueue);
}

export default deleteQueueSaga;