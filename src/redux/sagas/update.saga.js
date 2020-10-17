import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* changeStatus(action) {
    console.log('changeStatus got an action', action);
    const id = action.payload.idToChange
    yield axios ({
        method: 'PUT',
        url: `/api/queue/${id}`,
        data: action.payload
    });
    console.log('UPDATE / queue');
    yield put ({
        type: 'FETCH_QUEUE',
    })
}

function* updateSaga() {
  yield takeLatest('CHANGE_STATUS', changeStatus);
}

export default updateSaga;