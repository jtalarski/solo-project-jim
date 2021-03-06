import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import searchSaga from './search.saga';
import queueSaga from './queue.saga';
import deleteQueueSaga from './deleteQueue.saga';
import addMediaSaga from './createMedia.saga';
import updateSaga from './update.saga';
import watchedSaga from './watched.saga';
import friendsSaga from './friends.saga';
import recommendSaga from './recommend.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    searchSaga(),
    queueSaga(),
    deleteQueueSaga(),
    addMediaSaga(),
    updateSaga(),
    watchedSaga(),
    friendsSaga(),
    recommendSaga(),
  ]);
}
