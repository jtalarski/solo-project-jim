import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchMovie(action) {
    console.log('fetchMovie got an action', action);
    let response = yield axios ({
        method: 'GET',
        url: `/api/shelf/${action.payload}`
        //url: `/api/search/${action.payload}`
    });
    console.log('GET /search response', response.data);
    yield put ({
        type: 'SET_MOVIE',
        payload: response.data
    })
}

function* searchSaga() {
  yield takeLatest('FETCH_MOVIE', fetchMovie);
}

export default searchSaga;