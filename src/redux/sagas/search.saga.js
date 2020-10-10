import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchMovie(action) {
    console.log('fetchMovie got an action', action);
    let response = yield axios ({
        method: 'GET',
        url: `api/info/${action.payload}`
    });
    console.log('GET /info response', response);
    yield put ({
        type: 'SET_MOVIE',
        payload: response.data
    })
}

function* searchSaga() {
  yield takeLatest('FETCH_MOVIE', fetchMovie);
}

export default searchSaga;